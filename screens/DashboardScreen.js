import { View, Text, ScrollView, useWindowDimensions, StyleSheet } from 'react-native';
import { BarChart, PieChart, ProgressChart } from 'react-native-chart-kit';
import ScreenHeader from '../components/ScreenHeader';
import StatCard from '../components/StatCard';
import EmptyState from '../components/EmptyState';
import { COLORS, STATUS_LABELS, ATTENDANCE_THRESHOLD } from '../constants';
import {
  getPercentage,
  getOverallAttendance,
  getAverageMarks,
  countByStatus,
} from '../utils/attendance';

const chartConfig = {
  backgroundGradientFrom: '#FFFFFF',
  backgroundGradientTo: '#FFFFFF',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
  labelColor: () => COLORS.subtext,
};

export default function DashboardScreen({ courses, onBack }) {
  const { width } = useWindowDimensions();
  const chartWidth = width - 56; // screen padding + card padding

  if (courses.length === 0) {
    return (
      <>
        <ScreenHeader title="Dashboard" onBack={onBack} />
        <EmptyState icon="📊" title="Nothing to show" message="Add a course to see your charts." />
      </>
    );
  }

  const overall = getOverallAttendance(courses);
  const averageMarks = getAverageMarks(courses);
  const counts = countByStatus(courses);

  // Chart 1 (Progress): values must be between 0 and 1.
  const progressData = {
    labels: ['Attendance', 'Marks'],
    data: [Math.min(overall / 100, 1), Math.min(averageMarks / 100, 1)],
  };

  // Chart 2 (Pie): one slice per status, skipping statuses with 0 courses.
  const pieData = ['safe', 'warning', 'danger']
    .filter((status) => counts[status] > 0)
    .map((status) => ({
      name: STATUS_LABELS[status],
      population: counts[status],
      color: COLORS[status],
      legendFontColor: COLORS.text,
      legendFontSize: 13,
    }));

  // Chart 3 (Bar): attendance % of every course.
  const barData = {
    labels: courses.map((c) => c.code),
    datasets: [{ data: courses.map((c) => Math.round(getPercentage(c))) }],
  };
  const barWidth = Math.max(chartWidth, courses.length * 80); // scroll sideways if many courses

  return (
    <>
      <ScreenHeader title="Dashboard" onBack={onBack} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.statRow}>
          <StatCard label="Overall attendance" value={`${overall.toFixed(0)}%`} color={overall >= ATTENDANCE_THRESHOLD ? COLORS.safe : COLORS.danger} />
          <StatCard label="Safe" value={counts.safe} color={COLORS.safe} />
          <StatCard label="Warning" value={counts.warning} color={COLORS.warning} />
          <StatCard label="Low" value={counts.danger} color={COLORS.danger} />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Attendance and marks</Text>
          <ProgressChart data={progressData} width={chartWidth} height={170} strokeWidth={14} radius={30} chartConfig={chartConfig} />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Courses by attendance status</Text>
          <PieChart
            data={pieData}
            width={chartWidth}
            height={160}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Attendance % per course (limit {ATTENDANCE_THRESHOLD}%)</Text>
          <ScrollView horizontal>
            <BarChart
              data={barData}
              width={barWidth}
              height={220}
              yAxisLabel=""
              yAxisSuffix="%"
              fromZero
              showValuesOnTopOfBars
              chartConfig={chartConfig}
            />
          </ScrollView>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingTop: 8 },
  statRow: { flexDirection: 'row', marginHorizontal: -4, marginBottom: 12 },
  card: { backgroundColor: COLORS.card, borderRadius: 12, padding: 12, marginBottom: 12 },
  cardTitle: { fontSize: 15, fontWeight: '600', color: COLORS.text, marginBottom: 8 },
});
