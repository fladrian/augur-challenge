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
  it('renders all severity cards correctly', () => {
    render(<StatCardsGroup stats={mockStats} />);
    
    expect(screen.getByText('Critical')).toBeInTheDocument();
    expect(screen.getByText('High')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText('Low')).toBeInTheDocument();

    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
  });

  it('renders zero values when stats are not provided', () => {
    render(<StatCardsGroup stats={undefined} />);
    
    expect(screen.getByText('Total Indicators')).toBeInTheDocument();
    const zeroes = screen.getAllByText('0');
    expect(zeroes.length).toBe(5);
  });
});
