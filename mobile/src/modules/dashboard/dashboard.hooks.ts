import { useState, useCallback, useEffect } from 'react';
import { fetchMetricsSummary, fetchCommitTrends, fetchLeaderboard, syncGithubData } from './dashboard.service';
import { MetricsSummary, TrendData, LeaderboardEntry, APP_STATUS, AppStatus } from './dashboard.types';
import { DASHBOARD_STRINGS } from './dashboard.constants';

export const useDashboardData = () => {
  const [metrics, setMetrics] = useState<MetricsSummary | null>(null);
  const [trends, setTrends] = useState<TrendData[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [status, setStatus] = useState<AppStatus>(APP_STATUS.IDLE);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadData = useCallback(async (isInitial = false) => {
    try {
      if (isInitial) setStatus(APP_STATUS.LOADING);
      setErrorMessage(null);

      const [summary, trendData, leaderboardData] = await Promise.all([
        fetchMetricsSummary(),
        fetchCommitTrends(),
        fetchLeaderboard(),
      ]);

      setMetrics(summary);
      setTrends(trendData);
      setLeaderboard(leaderboardData);
      setStatus(APP_STATUS.SUCCESS);
    } catch (err: any) {
      if (isInitial) setStatus(APP_STATUS.ERROR);
      setErrorMessage(DASHBOARD_STRINGS.ERROR_CONNECTION);
      console.error('Data Load Error:', err.message);
    }
  }, []);

  const refreshData = useCallback(async () => {
    try {
      setIsRefreshing(true);
      await syncGithubData();
      await loadData();
    } catch (err: any) {
      console.error('Refresh Error:', err.message);
    } finally {
      setIsRefreshing(false);
    }
  }, [loadData]);

  useEffect(() => {
    loadData(true);
  }, [loadData]);

  return {
    metrics,
    trends,
    leaderboard,
    status,
    errorMessage,
    isRefreshing,
    loadData,
    refreshData,
  };
};
