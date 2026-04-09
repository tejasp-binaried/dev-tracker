import { Request, Response } from 'express';
import { fetchRepositoryCommits, Commit } from '../github/github.service';
import { GITHUB_CONFIG } from '../../shared/constants/github.constants';
import { getMetricsSummary } from '../metrics/metrics.service';

export const getDeveloperCommits = async (
  request: Request,
  response: Response
): Promise<void> => {
  try {
    const commitList: Commit[] = await fetchRepositoryCommits(
      GITHUB_CONFIG.OWNER,
      GITHUB_CONFIG.REPO
    );

    console.log(`Successfully fetched and saved ${commitList.length} commits.`);
    response.status(200).json(commitList);
  } catch (error: any) {
    console.error(`Error in getDeveloperCommits: ${error.message}`);
    
    response.status(500).json({
      message: 'Failed to fetch commits',
      error: error.message,
    });
  }
};

export const getDevelopers = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const { developerStats } = await getMetricsSummary();
    const formattedDevelopers = developerStats.map(dev => ({
      id: dev.authorEmail,
      authorName: dev.authorName,
      commitCount: dev.commitCount
    }));
    res.status(200).json(formattedDevelopers);
  } catch (error: any) {
    console.error(`Error in getDevelopers: ${error.message}`);
    res.status(500).json({ message: 'Failed to fetch developers' });
  }
};