import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
