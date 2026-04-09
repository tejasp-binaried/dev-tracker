import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useActivityData } from './activity.hooks';
import { ActivityEntry } from './activity.types';

const getTimeAgo = (date: string) => {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);

  if (mins < 60) return `${mins} mins ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hrs ago`;

  const days = Math.floor(hours / 24);
  return `${days} days ago`;
};

const ActivityScreen = () => {
  const { 
    activities, 
    loading, 
    isRefreshing, 
    filterDays, 
    refreshActivities, 
    updateFilter 
  } = useActivityData();

  const renderItem = ({ item }: { item: ActivityEntry }) => (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.name}>{item.author}</Text>
        <Text style={styles.time}>{getTimeAgo(item.date)}</Text>
      </View>
      <Text style={styles.message}>{item.message}</Text>
      <Text style={styles.id}>ID: {item.id.substring(0, 7)}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Filtering results...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>Activity</Text>
        
        {/* 🛠️ Dynamic Filters */}
        <View style={styles.filterContainer}>
          {[
            { label: '7 Days', value: 7 },
            { label: '30 Days', value: 30 },
            { label: 'All Time', value: null }
          ].map((item) => (
            <TouchableOpacity
              key={item.label}
              onPress={() => updateFilter(item.value)}
              style={[
                styles.filterBtn,
                filterDays === item.value && styles.filterBtnActive
              ]}
            >
              <Text 
                style={[
                  styles.filterText, 
                  filterDays === item.value && styles.filterTextActive
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <FlatList
        data={activities}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refreshActivities}
            tintColor="#2196F3"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No activity found in this period</Text>
          </View>
        }
      />
    </View>
  );
};

export default ActivityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  screenHeader: {
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  screenTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  filterBtn: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  filterBtnActive: {
    backgroundColor: '#2196F3',
    borderColor: '#1976D2',
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  filterTextActive: {
    color: '#fff',
  },
  listContent: {
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  card: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 14,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#2196F3',
  },
  message: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
  },
  time: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
  id: {
    marginTop: 10,
    fontSize: 11,
    color: '#ccc',
    fontFamily: 'monospace',
  },
  emptyContainer: {
    padding: 60,
    alignItems: 'center',
  },
  emptyText: {
    color: '#bbb',
    fontSize: 16,
  },
});