import { create } from 'zustand';
import { Severity, IndicatorType, IndicatorFilters } from '@/types/indicator';

interface DashboardState {
  selectedIndicatorId: string | null;
  search: string;
  severity: Severity | 'all';
  type: IndicatorType | 'all';
  source: string | 'all';
  page: number;
  limit: number;

  setSelectedIndicatorId: (id: string | null) => void;
  setSearch: (search: string) => void;
  setSeverity: (severity: Severity | 'all') => void;
  setType: (type: IndicatorType | 'all') => void;
  setSource: (source: string | 'all') => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  resetFilters: () => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  selectedIndicatorId: null,
  search: '',
  severity: 'all',
  type: 'all',
  source: 'all',
  page: 1,
  limit: 20,

  setSelectedIndicatorId: (id) => set({ selectedIndicatorId: id }),
  setSearch: (search) => set({ search, page: 1 }), // Reset to page 1 on search
  setSeverity: (severity) => set({ severity, page: 1 }),
  setType: (type) => set({ type, page: 1 }),
  setSource: (source) => set({ source, page: 1 }),
  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit, page: 1 }),
  resetFilters: () => set({
    search: '',
    severity: 'all',
    type: 'all',
    source: 'all',
    page: 1,
    selectedIndicatorId: null
  }),
}));
