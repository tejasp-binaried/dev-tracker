import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  Dimensions,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { APP_STATUS } from "./dashboard.types";
import { DASHBOARD_STRINGS } from "./dashboard.constants";
import { useDashboardData } from "./dashboard.hooks";
import { styles, CHART_CONFIG } from "./dashboard.styles";

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

      <View style={styles.card}>
        <Text style={styles.label}>{DASHBOARD_STRINGS.TOTAL_COMMITS}</Text>
        <Text style={styles.value}>{metrics?.totalCommits ?? 0}</Text>
      </View>

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

      {metrics?.topContributor && (
        <View style={styles.card}>
          <Text style={styles.label}>{DASHBOARD_STRINGS.TOP_CONTRIBUTOR}</Text>
          <Text style={styles.name}>{metrics.topContributor.authorName}</Text>
          <Text style={styles.subText}>
            Total Commits: {metrics.topContributor.commitCount}
          </Text>
        </View>
      )}

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
