import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      
      {/* 👤 User Info */}
      <View style={styles.card}>
        <Text style={styles.name}>Tejas</Text>
        <Text style={styles.email}>tejasp-binaried</Text>
      </View>

      {/* 📊 Stats */}
      <View style={styles.card}>
        <Text style={styles.label}>Total Commits</Text>
        <Text style={styles.value}>7</Text>
      </View>

      {/* ⚙️ Actions */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  email: {
    marginTop: 5,
    color: '#666',
  },
  label: {
    fontSize: 12,
    color: '#999',
  },
  value: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#2196F3',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});