import { z } from 'zod';

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
  socialTaxRate: number;
  inpsTaxRate: number;
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

export interface EmployeeRecord {
  id: string;
  employeeId: string;
  type: 'leave' | 'overtime' | 'bonus' | 'deduction';
  date: string;
  amount?: number;
  leaveType?: 'vacation' | 'sick' | 'marriage' | 'bereavement' | 'paternity' | 'maternity' | 'study' | 'military' | 'unpaid';
  startDate?: string;
  endDate?: string;
  days?: number;
  description: string;
  isPaid?: boolean;
  taxes?: {
    incomeTax: number;
    socialTax: number;
    inpsTax: number;
  };
}

export interface SalaryCalculation {
  id: string;
  employeeId: string;
  employeeName: string;
  month: string;
  baseSalary: number;
  overtimePay: number;
  vacationPay: number;
  sickLeavePay: number;
  bonuses: number;
  deductions: number;
  pensionAmount: number;
  socialTax: number;
  incomeTax: number;
  grossSalary: number;
  netSalary: number;
  calculatedAt: string;
}

export interface LeaveBalance {
  type: string;
  total: number;
  used: number;
  remaining: number;
}