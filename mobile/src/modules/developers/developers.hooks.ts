import { useState, useCallback, useEffect, useMemo } from 'react';
import { fetchDevelopersAcrossProject } from './developers.service';
import { DeveloperEntry } from './developers.types';

export const useDevelopersData = () => {
  const [developers, setDevelopers] = useState<DeveloperEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadDevelopers = useCallback(async (isInitial = false) => {
    try {
      if (isInitial) setLoading(true);
      const data = await fetchDevelopersAcrossProject();
      setDevelopers(data);
    } catch (error) {
      console.error('Developers fetch error:', error);
    } finally {
      if (isInitial) setLoading(false);
    }
  }, []);

  const refreshDevelopers = useCallback(async () => {
    setIsRefreshing(true);
    await loadDevelopers();
    setIsRefreshing(false);
  }, [loadDevelopers]);

  useEffect(() => {
    loadDevelopers(true);
  }, [loadDevelopers]);

  const filteredDevelopers = useMemo(() => {
    if (!searchQuery) return developers;
    
    return developers.filter((dev) =>
      dev.authorName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [developers, searchQuery]);

  return {
    developers: filteredDevelopers,
    loading,
    searchQuery,
    setSearchQuery,
    isRefreshing,
    refreshDevelopers,
  };
};
