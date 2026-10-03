import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants';

// Shown whenever a list has nothing to display.
export default function EmptyState({ icon, title, message }) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: 24 },
  icon: { fontSize: 40 },
  title: { fontSize: 16, fontWeight: '600', color: COLORS.text, marginTop: 8 },
  message: { fontSize: 13, color: COLORS.subtext, textAlign: 'center', marginTop: 4 },
});
