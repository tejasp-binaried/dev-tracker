import React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useActivityData } from './activity.hooks';
import { ActivityEntry } from './activity.types';
import { styles } from './activity.styles';
import { getTimeAgo } from '../../shared/utils/date.utils';

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