import { Request, Response } from 'express';
import { getRecentCommits } from './activity.service';

export const fetchRecentCommits = async (req: Request, res: Response) => {
  try {
    const days = req.query.days ? Number(req.query.days) : undefined;
    const data = await getRecentCommits(days);
    res.json(data);
  } catch (error) {
    console.error('Activity API Error:', error);
    res.status(500).json({ message: 'Failed to fetch activity' });
  }
};
