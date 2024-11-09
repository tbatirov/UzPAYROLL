export interface Employee {
  id: string;
  name: string;
  position: string;
  pinfl: string;
  passportSeries: string;
  passportNumber: string;
  dateOfBirth: string;
  paymentType: 'salary' | 'hourly';
  paymentFrequency: 'monthly' | 'bimonthly';
  rate: number;
  startDate: string;
  taxRate: number;
  agreement: {
    vacationDaysPerYear: number;
    sickLeavePerYear: number;
    overtimeRate: number;
    paidLeaves: {
      marriage: number;
      bereavement: number;
      paternity: number;
      maternity: number;
      study: number;
      military: number;
    };
  };
}

export interface Record {
  id: string;
  employeeId: string;
  date: string;
  type: 'leave' | 'overtime' | 'bonus' | 'deduction';
  leaveType?: 'vacation' | 'sick' | 'marriage' | 'bereavement' | 'paternity' | 'maternity' | 'study' | 'military' | 'unpaid';
  days?: number;
  amount?: number;
  description: string;
  isPaid?: boolean;
}

export interface SalaryCalculation {
  id: string;
  employeeId: string;
  month: string;
  baseSalary: number;
  overtimePay: number;
  bonus: number;
  deductions: number;
  pensionFund: number;
  totalSalary: number;
  workDays: number;
  vacationDays: number;
  sickLeaveDays: number;
  paidLeaveDays: number;
  unpaidLeaveDays: number;
  taxAmount: number;
  netSalary: number;
}