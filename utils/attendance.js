import { ATTENDANCE_THRESHOLD, WARNING_MARGIN } from '../constants';

// Attendance percentage of one course (0 if no class has been held yet).
export function getPercentage(course) {
  if (course.held === 0) return 0;
  return (course.attended / course.held) * 100;
}

// Returns 'safe', 'warning' or 'danger'.
// Whole-number maths (attended * 100) is used to avoid decimal rounding problems.
export function getStatus(course) {
  if (course.held === 0) return 'safe';
  if (course.attended * 100 < ATTENDANCE_THRESHOLD * course.held) return 'danger';
  if (course.attended * 100 < (ATTENDANCE_THRESHOLD + WARNING_MARGIN) * course.held) return 'warning';
  return 'safe';
}

// How many more classes can be missed and still stay at or above the threshold.
export function classesCanMiss(course) {
  return Math.floor((course.attended * 100 - ATTENDANCE_THRESHOLD * course.held) / ATTENDANCE_THRESHOLD);
}

// How many classes in a row must be attended to get back to the threshold.
export function classesNeeded(course) {
  return Math.ceil((ATTENDANCE_THRESHOLD * course.held - course.attended * 100) / (100 - ATTENDANCE_THRESHOLD));
}

// The recommendation text shown on cards and in the home alerts.
export function getAdvice(course) {
  if (course.held === 0) return 'No classes held yet';
  if (getStatus(course) === 'danger') {
    return `Attend the next ${classesNeeded(course)} classes to reach ${ATTENDANCE_THRESHOLD}%`;
  }
  const canMiss = classesCanMiss(course);
  if (canMiss === 0) return 'You cannot miss any more classes';
  return `You can miss ${canMiss} more ${canMiss === 1 ? 'class' : 'classes'}`;
}

// Attendance across all courses together.
export function getOverallAttendance(courses) {
  const held = courses.reduce((sum, c) => sum + c.held, 0);
  const attended = courses.reduce((sum, c) => sum + c.attended, 0);
  if (held === 0) return 0;
  return (attended / held) * 100;
}

export function getAverageMarks(courses) {
  if (courses.length === 0) return 0;
  return courses.reduce((sum, c) => sum + c.marks, 0) / courses.length;
}

// Example result: { safe: 2, warning: 1, danger: 2 }
export function countByStatus(courses) {
  return {
    safe: courses.filter((c) => getStatus(c) === 'safe').length,
    warning: courses.filter((c) => getStatus(c) === 'warning').length,
    danger: courses.filter((c) => getStatus(c) === 'danger').length,
  };
}
