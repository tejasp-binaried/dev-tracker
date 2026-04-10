import { Request, Response, NextFunction } from 'express';
import { getCommitsPerDay, getDeveloperProductivity, getMetricsSummary } from './metrics.service';

export const getMetrics = async (
  _req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const metricsSummary = await getMetricsSummary();
  res.status(200).json(metricsSummary);
};

export const getCommitTrends = async (
  _req: Request, 
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const trendRecords = await getCommitsPerDay();
  res.status(200).json(trendRecords);
};

export const getLeaderboard = async (
  _req: Request, 
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const leaderboardStats = await getDeveloperProductivity();
  res.status(200).json(leaderboardStats);
};
