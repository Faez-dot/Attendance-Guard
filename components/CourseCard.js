import { View, Text, StyleSheet } from 'react-native';
import AppButton from './AppButton';
import { COLORS } from '../constants';
import { getPercentage, getStatus, getAdvice } from '../utils/attendance';

export default function CourseCard({ course, onPresent, onAbsent, onDelete }) {
  const percentage = getPercentage(course);
  const color = COLORS[getStatus(course)]; // safe -> green, warning -> orange, danger -> red

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.titleBox}>
          <Text style={styles.code}>{course.code} • {course.credits} credit hrs</Text>
          <Text style={styles.name}>{course.name}</Text>
        </View>
        <View style={[styles.badge, { backgroundColor: color }]}>
          <Text style={styles.badgeText}>{percentage.toFixed(0)}%</Text>
        </View>
      </View>

      <View style={styles.track}>
        <View style={[styles.fill, { width: `${Math.min(percentage, 100)}%`, backgroundColor: color }]} />
      </View>

      <Text style={styles.detail}>
        Attended {course.attended} of {course.held} classes • Marks: {course.marks}%
      </Text>
      <Text style={[styles.advice, { color }]}>{getAdvice(course)}</Text>

      <View style={styles.buttonRow}>
        <AppButton title="Present" onPress={onPresent} style={styles.button} />
        <AppButton title="Absent" onPress={onAbsent} variant="outline" style={styles.button} />
        <AppButton title="Delete" onPress={onDelete} variant="danger" style={styles.button} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: COLORS.card, borderRadius: 12, padding: 14, marginBottom: 12 },
  topRow: { flexDirection: 'row', alignItems: 'center' },
  titleBox: { flex: 1, marginRight: 8 },
  code: { fontSize: 12, color: COLORS.subtext },
  name: { fontSize: 16, fontWeight: '600', color: COLORS.text, marginTop: 2 },
  badge: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: 10 },
  badgeText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 15 },
  track: { height: 8, backgroundColor: '#E5E7EB', borderRadius: 4, marginTop: 12, overflow: 'hidden' },
  fill: { height: 8, borderRadius: 4 },
  detail: { fontSize: 13, color: COLORS.subtext, marginTop: 8 },
  advice: { fontSize: 14, fontWeight: '600', marginTop: 4 },
  buttonRow: { flexDirection: 'row', marginTop: 12 },
  button: { flex: 1, marginRight: 6, paddingVertical: 8 },
});
