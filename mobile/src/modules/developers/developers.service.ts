import { apiClient } from '../../services/apiClient';
import { DeveloperEntry } from './developers.types';

export const fetchDevelopersAcrossProject = async (): Promise<DeveloperEntry[]> => {
  const response = await apiClient.get<DeveloperEntry[]>('/developers');
  return response.data;
};
