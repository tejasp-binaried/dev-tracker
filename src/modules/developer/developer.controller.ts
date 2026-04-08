import { Request, Response } from 'express';
import { fetchRepositoryCommits, Commit } from '../github/github.service';

export const getDeveloperCommits = async (
  request: Request,
  response: Response
): Promise<void> => {
  try {
    const owner: string = 'binariedus';
    const repo: string = 'wiki';

    const commitList: Commit[] = await fetchRepositoryCommits(
      owner,
      repo
    );

    response.status(200).json(commitList);
  } catch (error) {
    console.error(error);
    response.status(500).json({
      message: 'Failed to fetch commits',
    });
  }
};