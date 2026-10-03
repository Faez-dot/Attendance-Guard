import { useState } from 'react';
import { ScrollView, Alert, StyleSheet } from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import FormInput from '../components/FormInput';
import AppButton from '../components/AppButton';

// The form inputs are generated from this array (data-driven UI).
const FIELDS = [
  { key: 'name', label: 'Course name', placeholder: 'e.g. Data Structures', keyboardType: 'default', maxLength: 40, autoCapitalize: 'words' },
  { key: 'code', label: 'Course code', placeholder: 'e.g. CS-2001', keyboardType: 'default', maxLength: 10, autoCapitalize: 'characters' },
  { key: 'credits', label: 'Credit hours (1 to 4)', placeholder: 'e.g. 3', keyboardType: 'numeric', maxLength: 1, autoCapitalize: 'none' },
  { key: 'held', label: 'Classes held so far', placeholder: 'e.g. 20', keyboardType: 'numeric', maxLength: 3, autoCapitalize: 'none' },
  { key: 'attended', label: 'Classes attended', placeholder: 'e.g. 18', keyboardType: 'numeric', maxLength: 3, autoCapitalize: 'none' },
  { key: 'marks', label: 'Current marks (0 to 100)', placeholder: 'e.g. 75', keyboardType: 'numeric', maxLength: 3, autoCapitalize: 'none' },
];

const EMPTY_FORM = { name: '', code: '', credits: '', held: '', attended: '', marks: '' };

// true only for text like "0", "12", "100" (digits only)
const isWholeNumber = (text) => /^\d+$/.test(text.trim());

// Returns an object with one message per invalid field. Empty object = form is valid.
function validate(form, courses) {
  const errors = {};

  if (form.name.trim().length < 3) {
    errors.name = 'Enter at least 3 characters';
  }

  if (form.code.trim() === '') {
    errors.code = 'Course code is required';
  } else if (courses.some((c) => c.code.toLowerCase() === form.code.trim().toLowerCase())) {
    errors.code = 'This course code already exists';
  }

  if (!isWholeNumber(form.credits) || Number(form.credits) < 1 || Number(form.credits) > 4) {
    errors.credits = 'Enter a whole number from 1 to 4';
  }

  if (!isWholeNumber(form.held)) {
    errors.held = 'Enter a whole number (0 or more)';
  }

  if (!isWholeNumber(form.attended)) {
    errors.attended = 'Enter a whole number (0 or more)';
  } else if (isWholeNumber(form.held) && Number(form.attended) > Number(form.held)) {
    errors.attended = 'Cannot be more than classes held';
  }

  if (!isWholeNumber(form.marks) || Number(form.marks) > 100) {
    errors.marks = 'Enter a whole number from 0 to 100';
  }

  return errors;
}

export default function AddCourseScreen({ courses, onBack, onAddCourse, onDone }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  // Update one field and clear its error message while the user types.
  const updateField = (key, text) => {
    setForm({ ...form, [key]: text });
    setErrors({ ...errors, [key]: undefined });
  };

  const handleSubmit = () => {
    const newErrors = validate(form, courses);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return; // stop if anything is invalid

    onAddCourse({
      id: Date.now(), // simple unique id
      name: form.name.trim(),
      code: form.code.trim().toUpperCase(),
      credits: Number(form.credits),
      held: Number(form.held),
      attended: Number(form.attended),
      marks: Number(form.marks),
    });
    Alert.alert('Course added', `${form.name.trim()} was added.`, [{ text: 'OK', onPress: onDone }]);
    setForm(EMPTY_FORM);
  };

  return (
    <>
      <ScreenHeader title="Add Course" onBack={onBack} />
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {FIELDS.map((f) => (
          <FormInput
            key={f.key}
            label={f.label}
            placeholder={f.placeholder}
            keyboardType={f.keyboardType}
            maxLength={f.maxLength}
            autoCapitalize={f.autoCapitalize}
            value={form[f.key]}
            onChangeText={(text) => updateField(f.key, text)}
            error={errors[f.key]}
          />
        ))}
        <AppButton title="Add Course" onPress={handleSubmit} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingTop: 8 },
});
