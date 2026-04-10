import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { fetchMetricsSummary } from '../../modules/dashboard/dashboard.service';
import { MetricsSummary } from '../../modules/dashboard/dashboard.types';

interface MetricsContextType {
  metrics: MetricsSummary | null;
  loading: boolean;
  error: string | null;
  refreshMetrics: () => Promise<void>;
}

const MetricsContext = createContext<MetricsContextType | undefined>(undefined);

export const MetricsProvider = ({ children }: { children: ReactNode }) => {
  const [metrics, setMetrics] = useState<MetricsSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshMetrics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchMetricsSummary();
      setMetrics(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch metrics');
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <MetricsContext.Provider value={{ metrics, loading, error, refreshMetrics }}>
      {children}
    </MetricsContext.Provider>
  );
};

export const useMetrics = () => {
  const context = useContext(MetricsContext);
  if (context === undefined) {
    throw new Error('useMetrics must be used within a MetricsProvider');
  }
  return context;
};
