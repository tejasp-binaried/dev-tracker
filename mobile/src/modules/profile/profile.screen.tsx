import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './profile.styles';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      
      <View style={styles.card}>
        <Text style={styles.name}>Tejas</Text>
        <Text style={styles.email}>tejasp-binaried</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Total Commits</Text>
        <Text style={styles.value}>7</Text>
      </View>

      <View style={styles.card}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sync Now</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Toggle Dark Mode</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default ProfileScreen;