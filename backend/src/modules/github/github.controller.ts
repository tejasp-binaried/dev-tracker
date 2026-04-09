import { Request, Response } from 'express';
import { getRecentCommits } from './github.repository';

export const getRecentActivities = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const recentCommits = await getRecentCommits(30);
    res.status(200).json(recentCommits);
  } catch (error: any) {
    console.error(`Error in getRecentActivities: ${error.message}`);
    res.status(500).json({
      message: 'Failed to fetch recent activity',
      error: error.message,
    });
  }
};
