import { useState } from 'react';
import { View, Text, TextInput, FlatList, Alert, StyleSheet } from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import CourseCard from '../components/CourseCard';
import Chip from '../components/Chip';
import EmptyState from '../components/EmptyState';
import { COLORS } from '../constants';
import { getPercentage, getStatus } from '../utils/attendance';

// The chips are generated from these arrays (data-driven UI).
const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'low', label: 'Low attendance' },
  { key: 'ok', label: 'On track' },
];
const SORTS = [
  { key: 'name', label: 'Name' },
  { key: 'attendance', label: 'Lowest attendance' },
];

export default function CoursesScreen({ courses, onBack, onMarkAttendance, onDelete }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // 1. search by name or code
  const text = search.trim().toLowerCase();
  let visible = courses.filter(
    (c) => c.name.toLowerCase().includes(text) || c.code.toLowerCase().includes(text)
  );
  // 2. filter by attendance status
  if (filter === 'low') visible = visible.filter((c) => getStatus(c) === 'danger');
  if (filter === 'ok') visible = visible.filter((c) => getStatus(c) !== 'danger');
  // 3. sort (copy first so the original array is not changed)
  visible = [...visible].sort((a, b) =>
    sortBy === 'name' ? a.name.localeCompare(b.name) : getPercentage(a) - getPercentage(b)
  );

  const confirmDelete = (course) => {
    Alert.alert('Delete course', `Remove ${course.name}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => onDelete(course.id) },
    ]);
  };

  const emptyTitle = courses.length === 0 ? 'No courses added' : 'No matching courses';
  const emptyMessage =
    courses.length === 0
      ? 'Go back and tap "Add Course".'
      : 'Try a different search or filter.';

  return (
    <View style={styles.container}>
      <ScreenHeader title="My Courses" onBack={onBack} />

      <View style={styles.controls}>
        <TextInput
          style={styles.search}
          placeholder="Search by course name or code"
          placeholderTextColor={COLORS.subtext}
          value={search}
          onChangeText={setSearch}
          autoCorrect={false}
          clearButtonMode="while-editing"
        />
        <View style={styles.chipRow}>
          {FILTERS.map((f) => (
            <Chip key={f.key} label={f.label} selected={filter === f.key} onPress={() => setFilter(f.key)} />
          ))}
        </View>
        <View style={styles.chipRow}>
          <Text style={styles.sortLabel}>Sort:</Text>
          {SORTS.map((s) => (
            <Chip key={s.key} label={s.label} selected={sortBy === s.key} onPress={() => setSortBy(s.key)} />
          ))}
        </View>
        <Text style={styles.count}>Showing {visible.length} of {courses.length} courses</Text>
      </View>

      <FlatList
        data={visible}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={<EmptyState icon="🔍" title={emptyTitle} message={emptyMessage} />}
        renderItem={({ item }) => (
          <CourseCard
            course={item}
            onPresent={() => onMarkAttendance(item.id, true)}
            onAbsent={() => onMarkAttendance(item.id, false)}
            onDelete={() => confirmDelete(item)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  controls: { paddingHorizontal: 16 },
  search: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: COLORS.text,
  },
  chipRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginTop: 10 },
  sortLabel: { fontSize: 13, color: COLORS.subtext, marginRight: 8 },
  count: { fontSize: 12, color: COLORS.subtext, marginTop: 10, marginBottom: 4 },
  list: { padding: 16, paddingTop: 8 },
});
