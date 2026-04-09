import { apiClient } from '../../services/apiClient';
import { ActivityEntry } from './activity.types';

export const fetchRecentActivities = async (days?: number | null): Promise<ActivityEntry[]> => {
  const url = days ? `/commits/recent?days=${days}` : '/commits/recent';
  const response = await apiClient.get<ActivityEntry[]>(url);
  return response.data;
};
