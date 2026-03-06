import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SeverityChart } from '../SeverityChart';

// Mock recharts to avoid JSDOM issues
vi.mock('recharts', async () => {
  const OriginalModule = await vi.importActual('recharts');
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
    PieChart: ({ children }: any) => <div data-testid="pie-chart">{children}</div>,
    Pie: ({ children }: any) => <div data-testid="pie">{children}</div>,
    Cell: () => <div />,
    Label: ({ content }: any) => {
      // Mock the label rendering which happens inside the Pie
      if (typeof content === 'function') {
        const result = content({ viewBox: { cx: 100, cy: 100 } });
        return result;
      }
      return <div>{content}</div>;
    },
    Tooltip: () => <div />,
  };
});

const mockStats = {
  total: 100,
  critical: 10,
  high: 20,
  medium: 30,
  low: 40,
};

describe('SeverityChart', () => {
  it('renders correctly with stats and legend', () => {
    render(<SeverityChart stats={mockStats} />);
    
    // Check if legend labels are present
    expect(screen.getByText('Critical')).toBeInTheDocument();
    expect(screen.getByText('High')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText('Low')).toBeInTheDocument();

    // Check if counts are present in the legend
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('40')).toBeInTheDocument();

    // Check if total count is displayed (from the Label mock)
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('calculates and displays percentages correct', () => {
    render(<SeverityChart stats={mockStats} />);
    expect(screen.getByText('10%')).toBeInTheDocument();
    expect(screen.getByText('20%')).toBeInTheDocument();
    expect(screen.getByText('30%')).toBeInTheDocument();
    expect(screen.getByText('40%')).toBeInTheDocument();
  });
});
