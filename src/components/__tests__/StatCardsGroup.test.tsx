import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StatCardsGroup } from '../StatCardsGroup';

const mockStats = {
  total: 100,
  critical: 5,
  high: 15,
  medium: 30,
  low: 50,
};

describe('StatCardsGroup', () => {
  it('renders all 4 severity cards correctly', () => {
    render(<StatCardsGroup stats={mockStats} variant="grid-4" />);
    
    // Check for labels
    expect(screen.getByText('Critical')).toBeInTheDocument();
    expect(screen.getByText('High')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText('Low')).toBeInTheDocument();

    // Check for values
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
    
    // Check for subValues
    expect(screen.getByText('Requires action')).toBeInTheDocument();
    expect(screen.getByText('Active monitoring')).toBeInTheDocument();
    expect(screen.getByText('Under review')).toBeInTheDocument();
    expect(screen.getByText('Informational')).toBeInTheDocument();
  });

  it('renders zero values when stats are not provided', () => {
    render(<StatCardsGroup stats={undefined} variant="grid-4" />);
    const zeroes = screen.getAllByText('0');
    expect(zeroes.length).toBe(4);
  });

  it('renders nothing for unknown variants', () => {
    // @ts-ignore - testing runtime behavior
    const { container } = render(<StatCardsGroup stats={mockStats} variant="unknown" />);
    expect(container.firstChild).toBeNull();
  });
});
