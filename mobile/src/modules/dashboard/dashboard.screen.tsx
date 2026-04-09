import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { fetchMetricsSummary, fetchCommitTrends } from './dashboard.service';
import { MetricsSummary, TrendData } from './dashboard.types';

export const DashboardScreen = () => {
  const [metrics, setMetrics] = useState<MetricsSummary | null>(null);
  const [trendData, setTrendData] = useState<TrendData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMetricsData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [summary, trends] = await Promise.all([
        fetchMetricsSummary(),
        fetchCommitTrends()
      ]);
      
      setMetrics(summary);
      setTrendData(trends);
    } catch (err: any) {
      setError('Connection failed. Is the backend running?');
      console.error('Failed to load dashboard data:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMetricsData();
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
        <Text style={[styles.text, { marginTop: 10, color: '#2196F3' }]} onPress={loadMetricsData}>
          Tap to retry
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Developer Tracker</Text>

      {/* Total Commits Card */}
      <View style={styles.card}>
        <Text style={styles.label}>Total Commits</Text>
        <Text style={styles.value}>{metrics?.totalCommits ?? 0}</Text>
      </View>

      {/* Commit Trends Chart */}
      {trendData.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.label}>Commit Trends</Text>
          <LineChart
            data={{
              labels: trendData.map((t) => t.date.split('-').slice(1).join('/')), // Shorten date
              datasets: [
                {
                  data: trendData.map((t) => t.count),
                },
              ],
            }}
            width={Dimensions.get('window').width - 80}
            height={220}
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      )}

      {/* Top Contributor */}
      {metrics?.topContributor && (
        <View style={styles.card}>
          <Text style={styles.label}>Top Contributor</Text>
          <Text style={styles.name}>
            {metrics.topContributor.authorName}
          </Text>
          <Text style={styles.subText}>
            Commits: {metrics.topContributor.commitCount}
          </Text>
        </View>
      )}

      {/* Developer List */}
      <View style={styles.card}>
        <Text style={styles.label}>Developers</Text>

        {metrics?.developerStats.map((dev) => (
          <View key={dev.authorEmail} style={styles.devRow}>
            <Text style={styles.name}>{dev.authorName}</Text>
            <Text style={styles.subText}>
              {dev.commitCount} commits
            </Text>
          </View>
        ))}
      </View>
      
      <View style={{ height: 40 }} />
    </ScrollView>
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
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 12,
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  value: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2196F3',
    marginTop: 5,
    textAlign: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 5,
  },
  subText: {
    fontSize: 14,
    color: '#777',
  },
  devRow: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
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