import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getIndicators, getStats, getIndicatorById } from '@/api/indicators';
import { useDashboardStore } from '@/store/useDashboardStore';

export const useIndicators = () => {
  const { search, severity, type, source, page, limit } = useDashboardStore();

  const filters = {
    search: search || undefined,
    severity: severity === 'all' ? undefined : severity,
    type: type === 'all' ? undefined : type,
    source: source === 'all' ? undefined : source,
    page,
    limit,
  };

  return useQuery({
    queryKey: ['indicators', filters],
    queryFn: () => getIndicators(filters),
    placeholderData: keepPreviousData,
    staleTime: 30000,
  });
};

export const useIndicatorStats = () => {
  return useQuery({
    queryKey: ['stats'],
    queryFn: getStats,
    staleTime: 60000,
  });
};

export const useIndicatorDetails = (id: string | null) => {
  return useQuery({
    queryKey: ['indicator', id],
    queryFn: () => (id ? getIndicatorById(id) : null),
    enabled: !!id,
    staleTime: 60000,
  });
};
