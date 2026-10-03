import { useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from './screens/HomeScreen';
import CoursesScreen from './screens/CoursesScreen';
import AddCourseScreen from './screens/AddCourseScreen';
import DashboardScreen from './screens/DashboardScreen';
import { initialCourses } from './data/courses';
import { COLORS } from './constants';

export default function App() {
  // All shared data lives here, and is passed down to the screens as props.
  const [courses, setCourses] = useState(initialCourses);
  // Which screen is visible: 'home', 'courses', 'add' or 'dashboard'.
  const [screen, setScreen] = useState('home');

  // Present: classes held +1 and attended +1. Absent: only classes held +1.
  const markAttendance = (id, present) => {
    setCourses(
      courses.map((c) =>
        c.id === id
          ? { ...c, held: c.held + 1, attended: present ? c.attended + 1 : c.attended }
          : c
      )
    );
  };

  const deleteCourse = (id) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  const addCourse = (newCourse) => {
    setCourses([...courses, newCourse]);
  };

  const goHome = () => setScreen('home');

  // Conditional rendering: only one screen is shown at a time.
  let content;
  if (screen === 'courses') {
    content = (
      <CoursesScreen
        courses={courses}
        onBack={goHome}
        onMarkAttendance={markAttendance}
        onDelete={deleteCourse}
      />
    );
  } else if (screen === 'add') {
    content = (
      <AddCourseScreen
        courses={courses}
        onBack={goHome}
        onAddCourse={addCourse}
        onDone={() => setScreen('courses')}
      />
    );
  } else if (screen === 'dashboard') {
    content = <DashboardScreen courses={courses} onBack={goHome} />;
  } else {
    content = <HomeScreen courses={courses} onNavigate={setScreen} />;
  }

    return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        {content}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
});
