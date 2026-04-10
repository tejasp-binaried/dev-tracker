import { StyleSheet } from 'react-native';

export const CHART_CONFIG = {
  backgroundColor: '#fff',
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: { borderRadius: 16 },
  propsForDots: { r: '6', strokeWidth: '2', stroke: '#ffa726' },
};

export const styles = StyleSheet.create({
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
