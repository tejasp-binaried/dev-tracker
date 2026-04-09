import { apiClient } from '../../services/apiClient';
import { MetricsSummary } from './dashboard.types';

export const fetchMetricsSummary = async (): Promise<MetricsSummary> => {
  const response = await apiClient.get<MetricsSummary>('/metrics/summary');
  return response.data;
};
