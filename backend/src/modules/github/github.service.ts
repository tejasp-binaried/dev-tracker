import axios from 'axios';
import apiClient from "../../services/apiClient";
import { GithubCommitResponseItem, GithubCommitAuthor } from "./github.types";
import { insertCommitList } from "./github.repository";

export interface Commit {
  sha: string;
  message: string;
  authorName: string;
  authorEmail: string;
  commitDate: string;
}

export const fetchRepositoryCommits = async (
  owner: string,
  repo: string,
): Promise<Commit[]> => {
  console.log(`Fetching commits from GitHub: /repos/${owner}/${repo}/commits`);
  try {
    const response = await apiClient.get<GithubCommitResponseItem[]>(
      `/repos/${owner}/${repo}/commits`,
    );

    const commitList: Commit[] = response.data.map(
      (commitItem: GithubCommitResponseItem): Commit => {
        const author: GithubCommitAuthor = commitItem.commit.author;

        if (!author) {
          throw new Error(`Missing author info for commit ${commitItem.sha}`);
        }

        return {
          sha: commitItem.sha,
          message: commitItem.commit.message,
          authorName: author.name,
          authorEmail: author.email,
          commitDate: author.date,
        };
      },
    );

    await insertCommitList(commitList);

    return commitList;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error(`GitHub API Error (${error.response?.status}): ${JSON.stringify(error.response?.data)}`);
    } else {
      console.error(`Error fetching commits: ${error.message}`);
    }
    throw error;
  }
};
