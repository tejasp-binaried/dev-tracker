export interface DeveloperResponseDTO {
  id: string;
  authorName: string;
  authorEmail: string;
  commitCount: number;
}

export interface MetricSummaryDTO {
  totalCommits: number;
  topContributor: {
    authorName: string;
    authorEmail: string;
    commitCount: number;
  } | null;
  developerStats: DeveloperResponseDTO[];
}
