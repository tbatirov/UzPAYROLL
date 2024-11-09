import type { Employee, EmployeeRecord } from '../types';

export const sampleEmployees: Employee[] = [
  {
    id: 'emp-001',
    name: 'John Smith',
    position: 'Software Engineer',
    pinfl: '12345678901234',
    passportSeries: 'AA',
    passportNumber: '1234567',
    dateOfBirth: '1990-01-15',
    paymentType: 'salary',
    paymentFrequency: 'monthly',
    rate: 5000000,
    startDate: '2024-01-01',
    taxRate: 12,
    agreement: {
      vacationDaysPerYear: 24,
      sickLeavePerYear: 15,
      overtimeRate: 1.5,
      paidLeaves: {
        marriage: 3,
        bereavement: 3,
        paternity: 5,
        maternity: 126,
        study: 14,
        military: 14
      }
    }
  },
  {
    id: 'emp-002',
    name: 'Sarah Johnson',
    position: 'Project Manager',
    pinfl: '98765432109876',
    passportSeries: 'BB',
    passportNumber: '7654321',
    dateOfBirth: '1985-05-20',
    paymentType: 'salary',
    paymentFrequency: 'monthly',
    rate: 7000000,
    startDate: '2024-01-01',
    taxRate: 12,
    agreement: {
      vacationDaysPerYear: 24,
      sickLeavePerYear: 15,
      overtimeRate: 1.5,
      paidLeaves: {
        marriage: 3,
        bereavement: 3,
        paternity: 5,
        maternity: 126,
        study: 14,
        military: 14
      }
    }
  }
];

export const sampleRecords: EmployeeRecord[] = [
  {
    id: 'rec-001',
    employeeId: 'emp-001',
    date: '2024-03-01',
    type: 'leave',
    leaveType: 'vacation',
    days: 5,
    description: 'Annual vacation',
    isPaid: true
  },
  {
    id: 'rec-002',
    employeeId: 'emp-001',
    date: '2024-03-15',
    type: 'overtime',
    amount: 8,
    description: 'Project deadline work'
  },
  {
    id: 'rec-003',
    employeeId: 'emp-002',
    date: '2024-03-10',
    type: 'bonus',
    amount: 1000000,
    description: 'Project completion bonus'
  },
  {
    id: 'rec-004',
    employeeId: 'emp-002',
    date: '2024-03-20',
    type: 'leave',
    leaveType: 'sick',
    days: 3,
    description: 'Medical leave',
    isPaid: true
  }
];