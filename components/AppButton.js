import { Pressable, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants';

const VARIANTS = {
  primary: { background: COLORS.primary, text: '#FFFFFF', border: COLORS.primary },
  outline: { background: '#FFFFFF', text: COLORS.primary, border: COLORS.primary },
  danger: { background: '#FFFFFF', text: COLORS.danger, border: COLORS.danger },
};

export default function AppButton({ title, onPress, variant = 'primary', style }) {
  const colors = VARIANTS[variant];
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: colors.background, borderColor: colors.border, opacity: pressed ? 0.6 : 1 },
        style,
      ]}
    >
      <Text style={[styles.text, { color: colors.text }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: 'center',
  },
  text: { fontSize: 15, fontWeight: '600' },
});
