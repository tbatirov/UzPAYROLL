import React from 'react';
import { Download } from 'lucide-react';
import type { Employee, MonthlyRecord, SalaryCalculation } from '../types';
import { formatCurrency } from '../utils/format';

interface SalaryTableProps {
  employees: Employee[];
  records: MonthlyRecord[];
  calculations: Record<string, SalaryCalculation>;
}

export default function SalaryTable({ employees, records, calculations }: SalaryTableProps) {
  const exportToCSV = () => {
    const headers = [
      'Employee',
      'Position',
      'Base Salary (UZS)',
      'Overtime Pay (UZS)',
      'Vacation Pay (UZS)',
      'Sick Leave Pay (UZS)',
      'Bonuses (UZS)',
      'Deductions (UZS)',
      'Tax Amount (UZS)',
      'Net Salary (UZS)'
    ];

    const rows = records.map(record => {
      const employee = employees.find(e => e.id === record.employeeId);
      const calculation = calculations[record.employeeId];
      
      return [
        employee?.name,
        employee?.position,
        Math.round(calculation.baseSalary),
        Math.round(calculation.overtimePay),
        Math.round(calculation.vacationPay),
        Math.round(calculation.sickLeavePay),
        Math.round(calculation.bonuses),
        Math.round(calculation.deductions),
        Math.round(calculation.taxAmount),
        Math.round(calculation.netSalary)
      ];
    });

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `salary-report-${new Date().toISOString().slice(0, 7)}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Salary Calculations</h2>
        <button
          onClick={exportToCSV}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <Download className="h-5 w-5" />
          <span>Export to CSV</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Base Salary</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Overtime</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Vacation</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Sick Leave</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Bonuses</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Deductions</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Tax</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Net Salary</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {records.map((record) => {
              const employee = employees.find(e => e.id === record.employeeId);
              const calculation = calculations[record.employeeId];
              
              return (
                <tr key={`${record.employeeId}-${record.month}-${record.year}`}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee?.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee?.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatCurrency(calculation.baseSalary)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatCurrency(calculation.overtimePay)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatCurrency(calculation.vacationPay)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatCurrency(calculation.sickLeavePay)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatCurrency(calculation.bonuses)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatCurrency(calculation.deductions)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatCurrency(calculation.taxAmount)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600 text-right">{formatCurrency(calculation.netSalary)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}