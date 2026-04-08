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
