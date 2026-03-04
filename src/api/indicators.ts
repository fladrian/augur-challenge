import axios from 'axios';
import { Indicator, IndicatorFilters, PaginatedResponse } from '../types/indicator';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getIndicators = async (filters: IndicatorFilters = {}) => {
  const { data } = await api.get<PaginatedResponse<Indicator>>('/indicators', {
    params: filters,
  });
  return data;
};

export const getIndicatorById = async (id: string) => {
  const { data } = await api.get<Indicator>(`/indicators/${id}`);
  return data;
};

export const getStats = async () => {
  const { data } = await api.get('/stats');
  return data;
};

export default api;
