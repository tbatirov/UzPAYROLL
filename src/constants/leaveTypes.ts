export const leaveTypes = {
  VACATION: 'vacation',
  SICK: 'sick',
  MARRIAGE: 'marriage',
  BEREAVEMENT: 'bereavement',
  PATERNITY: 'paternity',
  MATERNITY: 'maternity',
  STUDY: 'study',
  MILITARY: 'military'
} as const;

export type LeaveType = typeof leaveTypes[keyof typeof leaveTypes];