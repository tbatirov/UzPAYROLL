import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Download, Calculator } from 'lucide-react';
import { calculateSalary } from '../utils/calculations';
import { formatCurrency } from '../utils/format';
import type { Employee, EmployeeRecord, SalaryCalculation } from '../types';

interface SalaryCalculationsProps {
  employees: Employee[];
  records: EmployeeRecord[];
  salaryCalculations: SalaryCalculation[];
  onCalculate: (calculations: SalaryCalculation[]) => void;
}

export function SalaryCalculations({
  employees,
  records,
  salaryCalculations,
  onCalculate,
}: SalaryCalculationsProps) {
  const intl = useIntl();
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  const handleCalculate = () => {
    const calculations = employees.map(employee => 
      calculateSalary(employee, records, selectedMonth)
    );
    onCalculate(calculations);
  };

  const exportToCSV = () => {
    const headers = [
      'Employee',
      'Base Salary',
      'Overtime Pay',
      'Vacation Pay',
      'Sick Leave Pay',
      'Bonuses',
      'Deductions',
      'Gross Salary',
      'Income Tax',
      'Social Tax',
      'INPS Tax',
      'Net Salary'
    ];

    const rows = salaryCalculations
      .filter(calc => calc.month === selectedMonth)
      .map(calc => [
        calc.employeeName,
        calc.baseSalary,
        calc.overtimePay,
        calc.vacationPay,
        calc.sickLeavePay,
        calc.bonuses,
        calc.deductions,
        calc.grossSalary,
        calc.incomeTax,
        calc.socialTax,
        calc.pensionAmount,
        calc.netSalary
      ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(value => Math.round(value)).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `salary-report-${selectedMonth}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <button
            onClick={handleCalculate}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Calculator className="h-5 w-5" />
            {intl.formatMessage({ id: 'salary.calculate' })}
          </button>
        </div>
        {salaryCalculations.length > 0 && (
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <Download className="h-5 w-5" />
            {intl.formatMessage({ id: 'salary.export' })}
          </button>
        )}
      </div>

      {salaryCalculations.length > 0 && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {intl.formatMessage({ id: 'employee.form.name' })}
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {intl.formatMessage({ id: 'salary.base' })}
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {intl.formatMessage({ id: 'salary.overtime' })}
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {intl.formatMessage({ id: 'salary.vacation' })}
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {intl.formatMessage({ id: 'salary.sick' })}
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {intl.formatMessage({ id: 'salary.bonus' })}
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {intl.formatMessage({ id: 'salary.deduction' })}
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {intl.formatMessage({ id: 'salary.grossSalary' })}
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {intl.formatMessage({ id: 'salary.incomeTax' })}
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {intl.formatMessage({ id: 'salary.socialTax' })}
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {intl.formatMessage({ id: 'salary.inpsTax' })}
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {intl.formatMessage({ id: 'salary.net' })}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {salaryCalculations
                  .filter(calc => calc.month === selectedMonth)
                  .map((calculation) => (
                    <tr key={calculation.employeeId}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {calculation.employeeName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                        {formatCurrency(calculation.baseSalary)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                        {formatCurrency(calculation.overtimePay)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                        {formatCurrency(calculation.vacationPay)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                        {formatCurrency(calculation.sickLeavePay)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                        {formatCurrency(calculation.bonuses)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                        {formatCurrency(calculation.deductions)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                        {formatCurrency(calculation.grossSalary)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-red-600">
                        {formatCurrency(calculation.incomeTax)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-red-600">
                        {formatCurrency(calculation.socialTax)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-red-600">
                        {formatCurrency(calculation.pensionAmount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-green-600">
                        {formatCurrency(calculation.netSalary)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}