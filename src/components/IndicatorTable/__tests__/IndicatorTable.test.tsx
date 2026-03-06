import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { IndicatorTable } from '../index';
import { useDashboardStore } from '../../../store/useDashboardStore';
import { Indicator } from '../../../types/indicator';

// Mock the store
vi.mock('../../../store/useDashboardStore', () => ({
  useDashboardStore: vi.fn(),
}));

const mockData: Indicator[] = [
  {
    id: '1',
    value: '1.1.1.1',
    type: 'ip',
    severity: 'critical',
    confidence: 90,
    source: 'CrowdStrike',
    tags: ['apt', 'botnet'],
    lastSeen: new Date().toISOString(),
    firstSeen: new Date().toISOString(),
  },
  {
    id: '2',
    value: 'malicious.com',
    type: 'domain',
    severity: 'high',
    confidence: 85,
    source: 'VirusTotal',
    tags: ['phishing'],
    lastSeen: new Date().toISOString(),
    firstSeen: new Date().toISOString(),
  },
];

describe('IndicatorTable', () => {
  beforeEach(() => {
    (useDashboardStore as any).mockReturnValue({
      setSelectedIndicatorId: vi.fn(),
      selectedIndicatorId: null,
    });
  });

  it('renders loading state correctly', () => {
    const { container } = render(<IndicatorTable data={[]} isLoading={true} />);
    const skeletons = container.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renders error state correctly', () => {
    render(<IndicatorTable data={[]} isError={true} />);
    expect(screen.getByText('Failed to load indicators')).toBeInTheDocument();
  });

  it('renders empty data state correctly', () => {
    render(<IndicatorTable data={[]} />);
    expect(screen.getByText('No indicators found')).toBeInTheDocument();
  });

  it('renders data rows correctly', () => {
    render(<IndicatorTable data={mockData} />);
    expect(screen.getByText('1.1.1.1')).toBeInTheDocument();
    expect(screen.getByText('malicious.com')).toBeInTheDocument();
  });
});
