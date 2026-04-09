export const APP_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

export type AppStatus = typeof APP_STATUS[keyof typeof APP_STATUS];

export interface DeveloperMetrics {
  authorName: string;
  authorEmail: string;
  commitCount: number;
}

export interface MetricsSummary {
  totalCommits: number;
  topContributor: DeveloperMetrics | null;
  developerStats: DeveloperMetrics[];
}

export interface TrendData {
  date: string;
  count: number;
}

export interface LeaderboardEntry {
  authorName: string;
  authorEmail: string;
  commitCount: number;
  productivityScore: number;
}
