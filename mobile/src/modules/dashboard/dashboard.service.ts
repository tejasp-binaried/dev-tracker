import { apiClient } from '../../services/apiClient';

export interface MetricsSummary {
  totalCommits: number;
}

/**
 * Fetches metrics summary from the backend.
 */
export const fetchMetricsSummary = async (): Promise<MetricsSummary> => {
  try {
    const response = await apiClient.get<MetricsSummary>('/metrics/summary');
    return response.data;
  } catch (error: any) {
    console.error('API Error:', error.message);
    throw error;
  }
};
