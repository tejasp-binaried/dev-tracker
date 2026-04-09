import { apiClient } from '../../services/apiClient';
import { ActivityEntry } from './activity.types';

export const fetchRecentActivities = async (): Promise<ActivityEntry[]> => {
  const response = await apiClient.get<ActivityEntry[]>('/github/recent');
  return response.data;
};
