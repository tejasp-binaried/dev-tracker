import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { APP_STATUS } from "./dashboard.types";
import { DASHBOARD_STRINGS } from "./dashboard.constants";
import { useDashboardData } from "./dashboard.hooks";

export const DashboardScreen = () => {
  const { 
    metrics, 
    trends, 
    leaderboard, 
    status, 
    errorMessage, 
    isRefreshing, 
    loadData, 
    refreshData 
  } = useDashboardData();

  if (status === APP_STATUS.LOADING) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.text}>{DASHBOARD_STRINGS.LOADING}</Text>
      </View>
    );
  }

  if (status === APP_STATUS.ERROR) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{errorMessage}</Text>
        <Text
          style={[styles.text, styles.retryLink]}
          onPress={() => loadData(true)}
        >
          {DASHBOARD_STRINGS.RETRY}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl 
          refreshing={isRefreshing} 
          onRefresh={refreshData} 
          tintColor="#2196F3"
        />
      }
    >
      <View style={styles.headerRow}>
        <Text style={styles.header}>{DASHBOARD_STRINGS.HEADER}</Text>
      </View>

      {/* Total Commits Card */}
      <View style={styles.card}>
        <Text style={styles.label}>{DASHBOARD_STRINGS.TOTAL_COMMITS}</Text>
        <Text style={styles.value}>{metrics?.totalCommits ?? 0}</Text>
      </View>

      {/* Commit Trends Chart */}
      {trends.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.label}>{DASHBOARD_STRINGS.TRENDS}</Text>
          <LineChart
            data={{
              labels: trends.map((t) => t.date.split('-').slice(1).join('/')),
              datasets: [{ data: trends.map((t) => t.count) }],
            }}
            width={Dimensions.get('window').width - 80}
            height={220}
            chartConfig={CHART_CONFIG}
            bezier
            style={styles.chart}
          />
        </View>
      )}

      {/* Leaderboard Section */}
      <View style={styles.card}>
        <Text style={styles.label}>{DASHBOARD_STRINGS.LEADERBOARD}</Text>
        {leaderboard.map((dev, index) => (
          <View key={dev.authorEmail} style={styles.dividerRow}>
            <Text style={styles.name}>
              {index + 1}. {dev.authorName}
            </Text>
            <Text style={styles.subText}>Score: {dev.productivityScore}</Text>
          </View>
        ))}
      </View>

      {/* Top Contributor Summary */}
      {metrics?.topContributor && (
        <View style={styles.card}>
          <Text style={styles.label}>{DASHBOARD_STRINGS.TOP_CONTRIBUTOR}</Text>
          <Text style={styles.name}>{metrics.topContributor.authorName}</Text>
          <Text style={styles.subText}>
            Total Commits: {metrics.topContributor.commitCount}
          </Text>
        </View>
      )}

      {/* Full Developer List */}
      <View style={styles.card}>
        <Text style={styles.label}>{DASHBOARD_STRINGS.ALL_DEVELOPERS}</Text>
        {metrics?.developerStats.map((dev) => (
          <View key={dev.authorEmail} style={styles.dividerRow}>
            <Text style={styles.name}>{dev.authorName}</Text>
            <Text style={styles.subText}>{dev.commitCount} commits</Text>
          </View>
        ))}
      </View>

      <View style={styles.footerSpacing} />
    </ScrollView>
  );
};

export default DashboardScreen;

const CHART_CONFIG = {
  backgroundColor: '#fff',
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: { borderRadius: 16 },
  propsForDots: { r: '6', strokeWidth: '2', stroke: '#ffa726' },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 12,
    color: "#666",
    textTransform: "uppercase",
    letterSpacing: 1,
    fontWeight: "bold",
    marginBottom: 10,
  },
  value: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#2196F3",
    marginTop: 5,
    textAlign: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 5,
  },
  subText: {
    fontSize: 14,
    color: "#777",
  },
  dividerRow: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  errorText: {
    fontSize: 16,
    color: "#f44336",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  retryLink: {
    marginTop: 10,
    color: "#2196F3",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  footerSpacing: {
    height: 40,
  },
});
