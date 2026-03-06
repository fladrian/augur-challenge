import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useIndicators } from '../useIndicators';
import { useQuery } from '@tanstack/react-query';
import { useDashboardStore } from '../../store/useDashboardStore';
import { getIndicators } from '../../api/indicators';

// Mock dependencies
vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
  keepPreviousData: vi.fn(),
}));

vi.mock('../../store/useDashboardStore', () => ({
  useDashboardStore: vi.fn(),
}));

vi.mock('../../api/indicators', () => ({
  getIndicators: vi.fn(),
  getStats: vi.fn(),
  getIndicatorById: vi.fn(),
}));

describe('useIndicators hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls useQuery with correct filters from the store', () => {
    const mockStore = {
      search: 'test-search',
      severity: 'high',
      type: 'all',
      source: 'CrowdStrike',
      page: 2,
      limit: 10,
    };
    (useDashboardStore as any).mockReturnValue(mockStore);
    (useQuery as any).mockReturnValue({ data: null, isLoading: true });

    renderHook(() => useIndicators());

    const expectedFilters = {
      search: 'test-search',
      severity: 'high',
      type: undefined,
      source: 'CrowdStrike',
      page: 2,
      limit: 10,
    };

    expect(useQuery).toHaveBeenCalledWith(expect.objectContaining({
      queryKey: ['indicators', expectedFilters],
    }));
  });

  it('executes getIndicators when query function is called', async () => {
    (useDashboardStore as any).mockReturnValue({
      search: '',
      severity: 'all',
      type: 'all',
      source: 'all',
      page: 1,
      limit: 20,
    });
    
    const mockResponse = { data: [], total: 0, totalPages: 0 };
    (getIndicators as any).mockResolvedValue(mockResponse);
    
    let capturedQueryFn: any;
    (useQuery as any).mockImplementation((options: any) => {
      capturedQueryFn = options.queryFn;
      return { data: null, isLoading: true };
    });

    renderHook(() => useIndicators());
    
    // Call the function that would be executed by React Query
    const result = await capturedQueryFn();
    
    expect(getIndicators).toHaveBeenCalled();
    expect(result).toBe(mockResponse);
  });
});
