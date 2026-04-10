import { Request, Response, NextFunction } from 'express';
import { getAllDevelopers, syncDeveloperCommits } from './developer.service';

export const getDeveloperCommits = async (
  _req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const commitList = await syncDeveloperCommits();
  res.status(200).json(commitList);
};

export const getDevelopers = async (
  _req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const developers = await getAllDevelopers();
  res.status(200).json(developers);
};