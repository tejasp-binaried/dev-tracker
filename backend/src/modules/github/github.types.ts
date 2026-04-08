export interface GithubCommitAuthor {
  name: string;
  email: string;
  date: string;
}

export interface GithubCommitData {
  message: string;
  author: GithubCommitAuthor;
}

export interface GithubCommitResponseItem {
  sha: string;
  commit: GithubCommitData;
}
