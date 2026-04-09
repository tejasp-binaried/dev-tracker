import { db } from '../../config/db';
import { Commit } from './github.service';

export const insertCommitList = async (
  commitList: Commit[]
): Promise<void> => {
  for (const commitItem of commitList) {
    await db.query(
      `
      INSERT INTO commits (sha, author_name, author_email, message, commit_date)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (sha) DO NOTHING
      `,
      [
        commitItem.sha,
        commitItem.authorName,
        commitItem.authorEmail,
        commitItem.message,
        commitItem.commitDate,
      ]
    );
  }
};

export const getRecentCommits = async (limit: number = 20): Promise<Commit[]> => {
  const result = await db.query(
    `
    SELECT sha, author_name as "authorName", author_email as "authorEmail", message, commit_date as "commitDate"
    FROM commits
    ORDER BY commit_date DESC
    LIMIT $1
    `,
    [limit]
  );
  return result.rows;
};
