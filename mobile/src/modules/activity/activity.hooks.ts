import { useState, useCallback, useEffect } from 'react';
import { fetchRecentActivities } from './activity.service';
import { ActivityEntry } from './activity.types';

export const useActivityData = () => {
  const [activities, setActivities] = useState<ActivityEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filterDays, setFilterDays] = useState<number | null>(7); // Default to last 7 days

  const loadActivities = useCallback(async (isInitial = false, days = filterDays) => {
    try {
      if (isInitial) setLoading(true);
      const data = await fetchRecentActivities(days);
      setActivities(data);
    } catch (error) {
      console.error('Activity fetch error:', error);
    } finally {
      if (isInitial) setLoading(false);
    }
  }, [filterDays]);

  const refreshActivities = useCallback(async () => {
    setIsRefreshing(true);
    await loadActivities();
    setIsRefreshing(false);
  }, [loadActivities]);

  const updateFilter = useCallback((days: number | null) => {
    setFilterDays(days);
    loadActivities(true, days);
  }, [loadActivities]);

  useEffect(() => {
    loadActivities(true);
  }, [loadActivities]);

  return {
    activities,
    loading,
    isRefreshing,
    filterDays,
    refreshActivities,
    updateFilter,
  };
};
