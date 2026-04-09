import { View, Text, StyleSheet } from 'react-native';

const DevelopersScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Developers</Text>
      <Text style={styles.subtitle}>List of all contributors will appear here.</Text>
    </View>
  );
};

export default DevelopersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});