// Change ATTENDANCE_THRESHOLD and the whole app updates (cards, alerts, charts).
export const ATTENDANCE_THRESHOLD = 80;
// A course within this many % above the threshold is shown as "Warning".
export const WARNING_MARGIN = 5;

// The keys safe / warning / danger match the values returned by getStatus().
export const COLORS = {
  primary: '#2563EB',
  background: '#F3F4F6',
  card: '#FFFFFF',
  text: '#111827',
  subtext: '#6B7280',
  border: '#D1D5DB',
  safe: '#16A34A',
  warning: '#F59E0B',
  danger: '#DC2626',
};

export const STATUS_LABELS = {
  safe: 'Safe',
  warning: 'Warning',
  danger: 'Low',
};
