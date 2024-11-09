import React, { useEffect, useState } from 'react';
import { Calculator } from 'lucide-react';
import type { Employee, MonthlyRecord } from '../types';

interface MonthlyRecordFormProps {
  employee: Employee;
  onSubmit: (record: Omit<MonthlyRecord, 'id'>) => void;
  onCancel: () => void;
  calculateWorkDays: (month: string, year: number, employeeId: string) => number;
}

export default function MonthlyRecordForm({ 
  employee, 
  onSubmit, 
  onCancel,
  calculateWorkDays
}: MonthlyRecordFormProps) {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [workDays, setWorkDays] = useState(0);

  useEffect(() => {
    if (selectedMonth && selectedYear) {
      const calculatedDays = calculateWorkDays(selectedMonth, selectedYear, employee.id);
      setWorkDays(calculatedDays);
    }
  }, [selectedMonth, selectedYear, employee.id, calculateWorkDays]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const record = {
      employeeId: employee.id,
      month: selectedMonth,
      year: selectedYear,
      workDays,
      overtimeHours: Number(formData.get('overtimeHours')),
      bonuses: Number(formData.get('bonuses')),
      deductions: Number(formData.get('deductions')),
      vacationDays: 0, // These will be calculated from leave records
      sickLeaveDays: 0, // These will be calculated from leave records
    };
    
    onSubmit(record);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Month</label>
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Year</label>
          <input
            type="number"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            min="2000"
            max="2100"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Work Days (Auto-calculated)</label>
          <input
            type="number"
            value={workDays}
            disabled
            className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Overtime Hours</label>
          <input
            type="number"
            name="overtimeHours"
            min="0"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Bonuses</label>
          <input
            type="number"
            name="bonuses"
            min="0"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Deductions</label>
          <input
            type="number"
            name="deductions"
            min="0"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <Calculator className="h-4 w-4" />
          <span>Add Record</span>
        </button>
      </div>
    </form>
  );
}