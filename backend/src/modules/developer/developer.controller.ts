import { Request, Response } from 'express';
import { fetchRepositoryCommits, Commit } from '../github/github.service';
import { GITHUB_CONFIG } from '../../shared/constants/github.constants';

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