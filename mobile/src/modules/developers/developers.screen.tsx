import React from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useDevelopersData } from './developers.hooks';
import { DeveloperEntry } from './developers.types';
import { styles } from './developers.styles';

const DevelopersScreen = () => {
  const { 
    developers, 
    loading, 
    searchQuery, 
    setSearchQuery, 
    isRefreshing, 
    refreshDevelopers 
  } = useDevelopersData();

  const renderItem = ({ item }: { item: DeveloperEntry }) => (
    <View style={styles.card}>
      <View style={styles.avatarPlaceholder}>
        <Text style={styles.avatarText}>
          {item.authorName.charAt(0).toUpperCase()}
        </Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{item.authorName}</Text>
        <Text style={styles.count}>{item.commitCount} commits recorded</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Loading developers...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Developers</Text>
        <Text style={styles.subtitle}>Manage and view project contributors</Text>
        
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search by name..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.input}
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <FlatList
        data={developers}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refreshDevelopers}
            tintColor="#2196F3"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No developers found</Text>
          </View>
        }
      />
    </View>
  );
};

export default DevelopersScreen;