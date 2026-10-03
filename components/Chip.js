import { Pressable, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants';

// Small selectable button used for filters and sorting.
export default function Chip({ label, selected, onPress }) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, selected && styles.selectedChip]}>
      <Text style={[styles.text, selected && styles.selectedText]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
    marginRight: 8,
  },
  selectedChip: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  text: { fontSize: 13, color: COLORS.text },
  selectedText: { color: '#FFFFFF', fontWeight: '600' },
});
