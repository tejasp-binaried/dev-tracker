import { db } from '../../config/db';

export const getRecentCommits = async (days?: number) => {
  let query = `
    SELECT 
      sha AS id,
      author_name AS author,
      message,
      commit_date AS date
    FROM commits
  `;

  const queryParams: any[] = [];

  if (days) {
    query += ` WHERE commit_date >= NOW() - ($1 * INTERVAL '1 day')`;
    queryParams.push(days);
  }

  query += ` ORDER BY commit_date DESC LIMIT 20`;

  const result = await db.query(query, queryParams);
  return result.rows;
};
