import { Employee, EmployeeRecord, SalaryCalculation } from '../types';

export const calculateSalaries = (
  employees: Employee[],
  records: EmployeeRecord[],
  selectedMonth: string
): SalaryCalculation[] => {
  return employees.map(employee => {
    const employeeRecords = records.filter(
      record => record.employeeId === employee.id && 
      record.date.startsWith(selectedMonth)
    );

    // Calculate base salary
    const baseSalary = Number(employee.rate);

    // Calculate overtime
    const overtimeRecords = employeeRecords.filter(record => record.type === 'overtime');
    const overtimePay = overtimeRecords.reduce((total, record) => 
      total + (Number(record.amount) * Number(employee.overtimeRate)), 0);

    // Calculate bonuses
    const bonusRecords = employeeRecords.filter(record => record.type === 'bonus');
    const bonusTotal = bonusRecords.reduce((total, record) => 
      total + Number(record.amount), 0);

    // Calculate deductions
    const deductionRecords = employeeRecords.filter(record => record.type === 'deduction');
    const deductionTotal = deductionRecords.reduce((total, record) => 
      total + Number(record.amount), 0);

    // Calculate leave payments
    const leaveRecords = employeeRecords.filter(record => record.type === 'leave');
    const leavePay = leaveRecords.reduce((total, record) => {
      const dailyRate = baseSalary / 22; // Assuming 22 working days per month
      return total + (dailyRate * Number(record.amount));
    }, 0);

    // Calculate taxes
    const taxableAmount = baseSalary + overtimePay + bonusTotal + leavePay;
    const taxRate = Number(employee.taxRate) / 100;
    const socialTaxRate = Number(employee.socialTaxRate) / 100;
    const inpsTaxRate = Number(employee.inpsTaxRate) / 100;

    const taxAmount = taxableAmount * taxRate;
    const socialTax = taxableAmount * socialTaxRate;
    const inpsTax = taxableAmount * inpsTaxRate;

    // Calculate net salary
    const netSalary = taxableAmount - taxAmount - socialTax - inpsTax - deductionTotal;

    return {
      id: `${employee.id}-${selectedMonth}`,
      employeeId: employee.id,
      employeeName: employee.name,
      month: selectedMonth,
      baseSalary,
      overtimePay,
      bonusTotal,
      leavePay,
      deductionTotal,
      taxAmount,
      socialTax,
      inpsTax,
      netSalary,
      calculatedAt: new Date().toISOString()
    };
  });
};