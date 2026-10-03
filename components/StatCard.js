import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants';

// Small box showing one number, e.g. "Attendance 82%".
export default function StatCard({ label, value, color = COLORS.primary }) {
  return (
    <View style={styles.card}>
      <Text style={[styles.value, { color }]}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  value: { fontSize: 22, fontWeight: 'bold' },
  label: { fontSize: 12, color: COLORS.subtext, marginTop: 2 },
});
