import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// Small selectable button used for filters and sorting.
export default function Chip({ label, selected, onPress }) {
  // Colours are chosen with plain if/else logic so they always apply.
  const backgroundColor = selected ? '#2563EB' : '#FFFFFF';
  const borderColor = selected ? '#2563EB' : '#D1D5DB';
  const textColor = selected ? '#FFFFFF' : '#111827';

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.chip, { backgroundColor: backgroundColor, borderColor: borderColor }]}
    >
      <Text style={[styles.text, { color: textColor }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 4,
    alignItems: 'center',
  },
  text: { fontSize: 13, fontWeight: '600' },
});