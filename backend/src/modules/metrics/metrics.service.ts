import { db } from '../../config/db';
import { DeveloperMetrics, MetricsSummary, TrendData, LeaderboardEntry } from './metrics.types';

export const getMetricsSummary = async (): Promise<MetricsSummary> => {
  const result = await db.query(`
    SELECT author_name, author_email, COUNT(*) as commit_count
    FROM commits
    GROUP BY author_name, author_email
    ORDER BY commit_count DESC
  `);

  const developerStats: DeveloperMetrics[] = result.rows.map(
    (row): DeveloperMetrics => ({
      authorName: row.author_name,
      authorEmail: row.author_email,
      commitCount: Number(row.commit_count),
    })
  );

  const totalCommits: number = developerStats.reduce(
    (sum, dev) => sum + dev.commitCount,
    0
  );

  const topContributor: DeveloperMetrics | null =
    developerStats.length > 0 ? developerStats[0] : null;

  return {
    totalCommits,
    topContributor,
    developerStats,
  };
};

export const getCommitsPerDay = async (): Promise<TrendData[]> => {
  const result = await db.query(`
    SELECT 
      TO_CHAR(commit_date, 'YYYY-MM-DD') as date,
      COUNT(*) as count
    FROM commits
    GROUP BY TO_CHAR(commit_date, 'YYYY-MM-DD')
    ORDER BY date ASC
  `);

  return result.rows.map((row): TrendData => ({
    date: row.date,
    count: Number(row.count),
  }));
};

export const getDeveloperProductivity = async (): Promise<LeaderboardEntry[]> => {
  const result = await db.query(`
    SELECT 
      author_name,
      author_email,
      COUNT(*) as commit_count
    FROM commits
    GROUP BY author_name, author_email
  `);

  const productivyRecords: LeaderboardEntry[] = result.rows.map((row): LeaderboardEntry => {
    const commitCount = Number(row.commit_count);

    return {
      authorName: row.author_name,
      authorEmail: row.author_email,
      commitCount,
      productivityScore: commitCount * 10, // Simple scoring: 10 points per commit
    };
  });

  return productivyRecords.sort((a, b) => b.productivityScore - a.productivityScore);
};
