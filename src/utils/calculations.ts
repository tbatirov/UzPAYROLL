import type { Employee, EmployeeRecord, SalaryCalculation } from '../types';

const WORK_DAYS_PER_MONTH = 22; // Standard work days
const WORK_HOURS_PER_DAY = 8; // Standard work hours

interface TaxCalculationParams {
  amount: number;
  employee: Employee;
  type: EmployeeRecord['type'];
}

export function calculateTaxes({ amount, employee, type }: TaxCalculationParams) {
  // Deductions don't have taxes
  if (type === 'deduction') {
    return {
      incomeTax: 0,
      socialTax: 0,
      inpsTax: 0
    };
  }

  // Calculate INPS (pension fund)
  const inpsTax = amount * (employee.inpsTaxRate / 100);

  // Calculate social tax (paid by employer)
  const socialTax = amount * (employee.socialTaxRate / 100);

  // Calculate income tax on amount after pension deduction
  const taxableAmount = amount - inpsTax;
  const incomeTax = taxableAmount * (employee.taxRate / 100);

  return {
    incomeTax,
    socialTax,
    inpsTax
  };
}

export function calculateSalary(
  employee: Employee,
  records: EmployeeRecord[],
  month: string
): SalaryCalculation {
  // Get records for the selected month
  const monthRecords = records.filter(record => record.date.startsWith(month));

  // Calculate base salary based on payment type and frequency
  let baseSalary = employee.paymentType === 'hourly' 
    ? employee.rate * WORK_HOURS_PER_DAY * WORK_DAYS_PER_MONTH
    : employee.rate;

  // Adjust for bi-monthly payment
  if (employee.paymentFrequency === 'bimonthly') {
    baseSalary = baseSalary / 2;
  }

  // Calculate overtime pay
  const overtimeRecords = monthRecords.filter(record => record.type === 'overtime');
  const overtimeHours = overtimeRecords.reduce((sum, record) => sum + (record.amount || 0), 0);
  const hourlyRate = employee.paymentType === 'hourly' 
    ? employee.rate 
    : baseSalary / (WORK_DAYS_PER_MONTH * WORK_HOURS_PER_DAY);
  const overtimePay = overtimeHours * hourlyRate * employee.agreement.overtimeRate;

  // Calculate leave pay
  const leaveRecords = monthRecords.filter(record => record.type === 'leave' && record.isPaid);
  const dailyRate = baseSalary / WORK_DAYS_PER_MONTH;
  
  const vacationPay = leaveRecords
    .filter(record => record.leaveType === 'vacation')
    .reduce((sum, record) => sum + (record.days || 0) * dailyRate, 0);

  const sickLeavePay = leaveRecords
    .filter(record => record.leaveType === 'sick')
    .reduce((sum, record) => sum + (record.days || 0) * dailyRate, 0);

  // Calculate other paid leaves
  const otherLeavesPay = leaveRecords
    .filter(record => 
      record.leaveType !== 'vacation' && 
      record.leaveType !== 'sick' && 
      record.leaveType !== 'unpaid'
    )
    .reduce((sum, record) => sum + (record.days || 0) * dailyRate, 0);

  // Calculate bonuses
  const bonusRecords = monthRecords.filter(record => record.type === 'bonus');
  const bonuses = bonusRecords.reduce((sum, record) => sum + (record.amount || 0), 0);

  // Calculate deductions
  const deductionRecords = monthRecords.filter(record => record.type === 'deduction');
  const deductions = deductionRecords.reduce((sum, record) => sum + (record.amount || 0), 0);

  // Calculate gross salary (including all taxable components)
  const grossSalary = baseSalary + overtimePay + vacationPay + sickLeavePay + otherLeavesPay + bonuses;

  // Calculate taxes on gross salary
  const taxes = calculateTaxes({
    amount: grossSalary,
    employee,
    type: 'salary'
  });

  // Calculate net salary
  const netSalary = grossSalary - taxes.incomeTax - taxes.inpsTax - deductions;

  return {
    id: `${employee.id}-${month}`,
    employeeId: employee.id,
    employeeName: employee.name,
    month,
    baseSalary,
    overtimePay,
    vacationPay,
    sickLeavePay,
    bonuses,
    deductions,
    pensionAmount: taxes.inpsTax,
    socialTax: taxes.socialTax,
    incomeTax: taxes.incomeTax,
    grossSalary,
    netSalary,
    calculatedAt: new Date().toISOString()
  };
}