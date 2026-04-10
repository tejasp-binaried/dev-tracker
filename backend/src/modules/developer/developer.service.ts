import { getMetricsSummary } from '../metrics/metrics.service';
import { DeveloperResponseDTO } from '../../shared/dtos/developer.dto';
import { fetchRepositoryCommits, Commit } from '../github/github.service';
import { GITHUB_CONFIG } from '../../shared/constants/github.constants';

export const getAllDevelopers = async (): Promise<DeveloperResponseDTO[]> => {
  const { developerStats } = await getMetricsSummary();
  
  return developerStats.map(dev => ({
    id: dev.authorEmail,
    authorName: dev.authorName,
    authorEmail: dev.authorEmail,
    commitCount: dev.commitCount
  }));
};

export const syncDeveloperCommits = async (): Promise<Commit[]> => {
  const commitList = await fetchRepositoryCommits(
    GITHUB_CONFIG.OWNER,
    GITHUB_CONFIG.REPO
  );
  
  // Here we could add logic to save to DB if it wasn't already in fetchRepositoryCommits
  // For now, mirroring current behavior
  return commitList;
};
