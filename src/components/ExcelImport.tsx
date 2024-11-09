import React, { useRef } from 'react';
import { FileSpreadsheet, Download } from 'lucide-react';
import * as XLSX from 'xlsx';
import type { Employee } from '../types';

interface ExcelImportProps {
  onImport: (employees: Omit<Employee, 'id'>[]) => void;
}

export function ExcelImport({ onImport }: ExcelImportProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const workbook = XLSX.read(event.target?.result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);

        const employees: Omit<Employee, 'id'>[] = data.map((row: any) => ({
          name: row.name,
          position: row.position,
          pinfl: row.pinfl,
          passportSeries: row.passportSeries,
          passportNumber: row.passportNumber,
          dateOfBirth: row.dateOfBirth,
          paymentType: row.paymentType,
          paymentFrequency: row.paymentFrequency,
          rate: Number(row.rate),
          startDate: row.startDate,
          taxRate: Number(row.taxRate),
          socialTaxRate: 12,
          inpsTaxRate: 1,
          agreement: {
            vacationDaysPerYear: Number(row.vacationDays),
            sickLeavePerYear: Number(row.sickLeaveDays),
            overtimeRate: Number(row.overtimeRate),
            paidLeaves: {
              marriage: Number(row.marriageLeave),
              bereavement: Number(row.bereavementLeave),
              paternity: Number(row.paternityLeave),
              maternity: Number(row.maternityLeave),
              study: Number(row.studyLeave),
              military: Number(row.militaryLeave)
            }
          }
        }));

        onImport(employees);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } catch (error) {
        console.error('Error parsing Excel file:', error);
        alert('Error parsing Excel file. Please make sure it matches the template format.');
      }
    };
    reader.readAsBinaryString(file);
  };

  const downloadTemplate = () => {
    const template = [{
      name: 'John Doe',
      position: 'Software Engineer',
      pinfl: '12345678901234',
      passportSeries: 'AA',
      passportNumber: '1234567',
      dateOfBirth: '1990-01-01',
      paymentType: 'salary',
      paymentFrequency: 'monthly',
      rate: 5000000,
      startDate: '2024-01-01',
      taxRate: 12,
      vacationDays: 24,
      sickLeaveDays: 15,
      overtimeRate: 1.5,
      marriageLeave: 3,
      bereavementLeave: 3,
      paternityLeave: 5,
      maternityLeave: 126,
      studyLeave: 14,
      militaryLeave: 14
    }];

    const ws = XLSX.utils.json_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Template');
    XLSX.writeFile(wb, 'employee-import-template.xlsx');
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={downloadTemplate}
        className="flex items-center space-x-2 px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      >
        <Download className="h-4 w-4" />
        <span>Download Template</span>
      </button>
      
      <div className="relative">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept=".xlsx,.xls"
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center space-x-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <FileSpreadsheet className="h-4 w-4" />
          <span>Import Excel</span>
        </button>
      </div>
    </div>
  );
}