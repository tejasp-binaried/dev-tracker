import { apiClient } from '../../services/apiClient';
import { MetricsSummary, TrendData } from './dashboard.types';

export const fetchMetricsSummary = async (): Promise<MetricsSummary> => {
  const response = await apiClient.get<MetricsSummary>('/metrics/summary');
  return response.data;
};

export const fetchCommitTrends = async (): Promise<TrendData[]> => {
  const response = await apiClient.get<TrendData[]>('/metrics/trends');
  return response.data;
};