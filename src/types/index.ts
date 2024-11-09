export interface Employee {
  id: string;
  name: string;
  position: string;
  pinfl: string;
  passportSeries: string;
  passportNumber: string;
  dateOfBirth: string;
  rate: string;
  startDate: string;
  taxRate: string;
  socialTaxRate: string;
  inpsTaxRate: string;
  overtimeRate: string;
  paymentType: 'hourly' | 'salary';
  paymentFrequency: 'monthly' | 'bimonthly';
  vacationDays: number;
  sickLeaveDays: number;
  marriageLeave: number;
  bereavementLeave: number;
  paternityLeave: number;
  maternityLeave: number;
  studyLeave: number;
  militaryLeave: number;
}

export interface EmployeeRecord {
  id: string;
  employeeId: string;
  type: 'leave' | 'overtime' | 'bonus' | 'deduction';
  date: string;
  amount: string;
  description: string;
}

export interface SalaryCalculation {
  id: string;
  employeeId: string;
  employeeName: string;
  month: string;
  baseSalary: number;
  overtimePay: number;
  bonusTotal: number;
  leavePay: number;
  deductionTotal: number;
  taxAmount: number;
  socialTax: number;
  inpsTax: number;
  netSalary: number;
  calculatedAt: string;
}

export interface LeaveBalance {
  type: string;
  total: number;
  used: number;
  remaining: number;
}