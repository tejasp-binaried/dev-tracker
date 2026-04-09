import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchMetricsSummary, MetricsSummary } from './dashboard.service';

export const DashboardScreen = () => {
  const [metrics, setMetrics] = useState<MetricsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMetrics = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchMetricsSummary();
      setMetrics(data);
    } catch (err: any) {
      setError('Connection failed. Is the backend running?');
      console.error('Failed to load metrics:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMetrics();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.text}>Loading data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <Text style={[styles.text, { marginTop: 10 }]} onPress={loadMetrics}>
          Tap to retry
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Developer Tracker</Text>
      
      <View style={styles.card}>
        <Text style={styles.label}>Total Commits</Text>
        <Text style={styles.value}>{metrics?.totalCommits ?? 0}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 20,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  value: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2196F3',
    marginTop: 5,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    fontSize: 16,
    color: '#f44336',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});