import { View, Text, Pressable, StyleSheet } from 'react-native';
import { COLORS } from '../constants';

export default function ScreenHeader({ title, onBack }) {
  return (
    <View style={styles.header}>
      <Pressable onPress={onBack} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </Pressable>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { padding: 16, paddingBottom: 8 },
  backButton: { alignSelf: 'flex-start', paddingVertical: 4 },
  backText: { fontSize: 15, color: COLORS.primary, fontWeight: '600' },
  title: { fontSize: 24, fontWeight: 'bold', color: COLORS.text, marginTop: 4 },
});
