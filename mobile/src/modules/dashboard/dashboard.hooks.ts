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
  const [isSyncing, setIsSyncing] = useState(false);

  const loadAllData = useCallback(async (showLoading = true) => {
    try {
      if (showLoading) setStatus(APP_STATUS.LOADING);
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
      if (showLoading) setStatus(APP_STATUS.ERROR);
      setErrorMessage(DASHBOARD_STRINGS.ERROR_CONNECTION);
      console.error('Dashboard Load Error:', err.message);
    }
  }, []);

  const triggerSync = useCallback(async () => {
    try {
      setIsSyncing(true);
      await syncGithubData();
      await loadAllData(false); // Refresh data after sync without full screen loading
    } catch (err: any) {
      console.error('Sync Error:', err.message);
    } finally {
      setIsSyncing(false);
    }
  }, [loadAllData]);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  return {
    metrics,
    trends,
    leaderboard,
    status,
    errorMessage,
    isSyncing,
    refresh: loadAllData,
    triggerSync,
  };
};
