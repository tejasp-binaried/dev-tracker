import apiClient from '../../services/apiClient';
import {
  GithubCommitResponseItem,
  GithubCommitAuthor,
} from './github.types';

export interface Commit {
  sha: string;
  message: string;
  authorName: string;
  authorEmail: string;
  commitDate: string;
}

export const fetchRepositoryCommits = async (
  owner: string,
  repo: string
): Promise<Commit[]> => {
  const response = await apiClient.get<GithubCommitResponseItem[]>(
    `/repos/${owner}/${repo}/commits`
  );

  const commitList: Commit[] = response.data.map(
    (commitItem: GithubCommitResponseItem): Commit => {
      const author: GithubCommitAuthor = commitItem.commit.author;

      return {
        sha: commitItem.sha,
        message: commitItem.commit.message,
        authorName: author.name,
        authorEmail: author.email,
        commitDate: author.date,
      };
    }
  );

  return commitList;
};