import { View, Text, ScrollView, StyleSheet } from 'react-native';
import StatCard from '../components/StatCard';
import AppButton from '../components/AppButton';
import EmptyState from '../components/EmptyState';
import { COLORS, ATTENDANCE_THRESHOLD } from '../constants';
import {
  getOverallAttendance,
  getAverageMarks,
  getPercentage,
  getStatus,
  getAdvice,
} from '../utils/attendance';

export default function HomeScreen({ courses, onNavigate }) {
  const overall = getOverallAttendance(courses);
  const averageMarks = getAverageMarks(courses);
  const overallColor = overall >= ATTENDANCE_THRESHOLD ? COLORS.safe : COLORS.danger;

  // Courses that need attention, lowest attendance first.
  const alerts = courses
    .filter((c) => getStatus(c) !== 'safe')
    .sort((a, b) => getPercentage(a) - getPercentage(b));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Attendance Guard</Text>
      <Text style={styles.subtitle}>Know exactly how many classes you can miss.</Text>

      <View style={styles.statRow}>
        <StatCard label="Attendance" value={`${overall.toFixed(0)}%`} color={overallColor} />
        <StatCard label="Avg. marks" value={`${averageMarks.toFixed(0)}%`} />
        <StatCard label="Courses" value={courses.length} />
      </View>

      <Text style={styles.sectionTitle}>Needs your attention</Text>
      {courses.length === 0 && (
        <EmptyState icon="📚" title="No courses yet" message="Add your first course to start tracking." />
      )}
      {courses.length > 0 && alerts.length === 0 && (
        <EmptyState icon="✅" title="All clear" message={`Every course is above ${ATTENDANCE_THRESHOLD}%.`} />
      )}
      {alerts.map((c) => (
        <View key={c.id} style={styles.alertRow}>
          <View style={[styles.dot, { backgroundColor: COLORS[getStatus(c)] }]} />
          <View style={styles.alertText}>
            <Text style={styles.alertName}>
              {c.name} ({getPercentage(c).toFixed(0)}%)
            </Text>
            <Text style={styles.alertAdvice}>{getAdvice(c)}</Text>
          </View>
        </View>
      ))}

      <View style={styles.menu}>
        <AppButton title="My Courses" onPress={() => onNavigate('courses')} style={styles.menuButton} />
        <AppButton title="Add Course" onPress={() => onNavigate('add')} variant="outline" style={styles.menuButton} />
        <AppButton title="Dashboard" onPress={() => onNavigate('dashboard')} variant="outline" style={styles.menuButton} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 28, fontWeight: 'bold', color: COLORS.text },
  subtitle: { fontSize: 14, color: COLORS.subtext, marginBottom: 16 },
  statRow: { flexDirection: 'row', marginHorizontal: -4 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: COLORS.text, marginTop: 20, marginBottom: 8 },
  alertRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  dot: { width: 12, height: 12, borderRadius: 6, marginRight: 12 },
  alertText: { flex: 1 },
  alertName: { fontSize: 15, fontWeight: '600', color: COLORS.text },
  alertAdvice: { fontSize: 13, color: COLORS.subtext, marginTop: 2 },
  menu: { marginTop: 20 },
  menuButton: { marginBottom: 10 },
});
