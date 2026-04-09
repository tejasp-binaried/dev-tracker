import { Request, Response } from 'express';
import { getCommitsPerDay, getDeveloperProductivity, getMetricsSummary } from './metrics.service';

export const getMetrics = async (
  _request: Request,
  response: Response
): Promise<void> => {
  try {
    const metricsSummary = await getMetricsSummary();
    response.status(200).json(metricsSummary);
  } catch (error: any) {
    console.error(`Error in getMetrics: ${error.message}`);
    response.status(500).json({
      message: 'Failed to fetch metrics',
      error: error.message,
    });
  }
};

export const getCommitTrends = async (_req: Request, res: Response) => {
  try {
    const trendRecords = await getCommitsPerDay();
    res.status(200).json(trendRecords);
  } catch (error: any) {
    console.error(`Error in getCommitTrends: ${error.message}`);
    res.status(500).json({
      message: 'Failed to fetch trends',
    });
  }
};

export const getLeaderboard = async (_req: Request, res: Response) => {
  try {
    const leaderboardStats = await getDeveloperProductivity();
    res.status(200).json(leaderboardStats);
  } catch (error: any) {
    console.error(`Error in getLeaderboard: ${error.message}`);
    res.status(500).json({ message: 'Failed to fetch leaderboard' });
  }
};
