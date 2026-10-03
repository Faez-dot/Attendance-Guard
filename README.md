# Attendance Guard — FLEX Companion

**Course:** Software for Mobile Devices (Assignment 1)
**Tech:** React Native (Expo), JavaScript, react-native-chart-kit

## 1. The problem

On the university portal (FLEX), a student only sees an attendance **percentage** per course.
It does not answer the questions students actually have:

- "How many more classes can I miss before I drop below 80%?"
- "I'm already below 80% — how many classes in a row must I attend to recover?"
- "Which of my courses need attention first?"

## 2. The solution

**Attendance Guard** turns raw attendance numbers into clear, personal advice.
Every course card shows a colour-coded status (green / orange / red) and a plain-English
recommendation, for example *"You can miss 2 more classes"* or *"Attend the next 11 classes to reach 80%"*.
The home screen lists only the courses that need attention, and a dashboard shows the overall picture.

## 3. Features

| Screen | What the student can do |
|---|---|
| **Home** | See overall attendance, average marks, number of courses, and a list of courses that need attention (lowest first). |
| **My Courses** | Search by name/code, filter (All / Low attendance / On track), sort (Name / Lowest attendance), tap **Present** or **Absent** after each class, delete a course (with confirmation). |
| **Add Course** | Form with validation: required fields, number ranges, attended ≤ held, duplicate course codes. Error messages appear under each field. |
| **Dashboard** | Three charts (react-native-chart-kit): **Progress chart** (attendance & marks), **Pie chart** (courses by status), **Bar chart** (attendance % per course). |

Navigation uses **no side bar, bottom bar or navigation library**. One `useState` value (`screen`) in `App.js`
decides which screen is shown (conditional rendering), as taught in class.

## 4. Where each requirement is met

| Requirement | Where |
|---|---|
| A. Meaningful problem | Sections 1–2 above |
| B. React Native app, no side/bottom bars | Whole project; screen switching in `App.js` |
| C. React concepts | Components, props, `useState`, events (`onPress`, `onChangeText`), conditional rendering |
| D. JavaScript | `utils/attendance.js` (`reduce`, `filter`, `Math.floor/ceil`), search/filter/sort in `CoursesScreen.js` (`filter`, `includes`, `sort`, spread `[...]`) |
| E. User interaction | Present/Absent buttons, search box, filter & sort chips, delete, form, add course |
| F. Data-driven UI | `data/courses.js` array → cards; `FILTERS`, `SORTS`, `FIELDS` arrays → chips and form inputs; chart data built from the courses array |
| G. Form / input | `AddCourseScreen.js` with `keyboardType`, `maxLength`, `autoCapitalize`, `placeholder` + `validate()` |
| H. Application states | Empty list, no search results, no courses on home/dashboard, safe / warning / low status, new course with 0 classes |
| I. Reusable components | `AppButton`, `Chip`, `StatCard`, `EmptyState`, `FormInput`, `ScreenHeader`, `CourseCard` |
| J. Usability | One consistent colour scheme, large touch buttons, clear messages and confirmations |
| Dashboard (2+ chart types) | `DashboardScreen.js` — ProgressChart, PieChart, BarChart |

## 5. Project structure

```
App.js                  state (courses, screen) + switches screens
constants.js            ATTENDANCE_THRESHOLD (80), WARNING_MARGIN (5), colours
data/courses.js         starting course data (array of objects)
utils/attendance.js     all calculations (percentage, status, advice, totals)
components/             small reusable UI pieces
screens/                Home, Courses, AddCourse, Dashboard
```

## 6. How the attendance advice works

- **Status:** below 80% → Low (red) · 80% up to just under 85% → Warning (orange) · 85% or more → Safe (green)
- **Can miss:** `floor((attended × 100 − 80 × held) / 80)`
- **Must attend:** `ceil((80 × held − attended × 100) / 20)`

Whole-number maths is used on purpose, so decimals like `0.8 × 10` never cause rounding mistakes.
To change the rule, edit `ATTENDANCE_THRESHOLD` in `constants.js`.

## 7. Setup and run

**Option A — Expo on your computer**

```bash
npx create-expo-app@latest attendance-guard --template blank
cd attendance-guard
npx expo install react-native-chart-kit react-native-svg react-native-safe-area-context
```

Then copy `App.js`, `constants.js` and the folders `components/`, `data/`, `screens/`, `utils/`
from this project into that folder (replace the existing `App.js`), and run:

```bash
npx expo start
```

Scan the QR code with the **Expo Go** app on your phone.

**Option B — Expo Snack:** open https://snack.expo.dev, create the same files and folders, paste the code,
and accept the prompt to add `react-native-chart-kit`, `react-native-svg` and `react-native-safe-area-context`.

## 8. Screenshots

Add your screenshots to a `screenshots/` folder (Home, My Courses, Add Course with errors, Dashboard).

## 9. AI usage

AI (Claude) was used as a development assistant. See `AI_Usage_Report.docx`.
