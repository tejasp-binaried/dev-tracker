import { useState, useCallback, useEffect } from 'react';
import { fetchRecentActivities } from './activity.service';
import { ActivityEntry } from './activity.types';

export const useActivityData = () => {
  const [activities, setActivities] = useState<ActivityEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadActivities = useCallback(async (isInitial = false) => {
    try {
      if (isInitial) setLoading(true);
      const data = await fetchRecentActivities();
      setActivities(data);
    } catch (error) {
      console.error('Activity fetch error:', error);
    } finally {
      if (isInitial) setLoading(false);
    }
  }, []);

  const refreshActivities = useCallback(async () => {
    setIsRefreshing(true);
    await loadActivities();
    setIsRefreshing(false);
  }, [loadActivities]);

  useEffect(() => {
    loadActivities(true);
  }, [loadActivities]);

  return {
    activities,
    loading,
    isRefreshing,
    refreshActivities,
  };
};
