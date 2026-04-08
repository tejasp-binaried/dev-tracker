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
