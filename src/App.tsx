import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import { Navigation } from './components/Navigation';
import { EmployeeList } from './components/EmployeeList';
import { SalaryCalculations } from './components/SalaryCalculations';
import { ApiDocs } from './components/ApiDocs';
import { Documentation } from './components/Documentation';
import { Employee, EmployeeRecord, SalaryCalculation } from './types';
import { en } from './translations/en';
import { ru } from './translations/ru';
import { uz } from './translations/uz';
import { sampleEmployees, sampleRecords } from './components/SampleData';

const messages = { en, ru, uz };

export function App() {
  const [locale, setLocale] = useState(localStorage.getItem('locale') || 'en');
  const [activeTab, setActiveTab] = useState<'employees' | 'salaries' | 'api' | 'docs'>('employees');
  const [employees, setEmployees] = useState<Employee[]>(sampleEmployees);
  const [records, setRecords] = useState<EmployeeRecord[]>(sampleRecords);
  const [salaryCalculations, setSalaryCalculations] = useState<SalaryCalculation[]>([]);

  const handleAddEmployee = (employee: Employee) => {
    setEmployees(prev => [...prev, employee]);
  };

  const handleUpdateEmployee = (updatedEmployee: Employee) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    ));
  };

  const handleCalculateSalaries = (calculations: SalaryCalculation[]) => {
    setSalaryCalculations(calculations);
  };

  const handleDeleteEmployee = (id: string) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
    setRecords(prev => prev.filter(rec => rec.employeeId !== id));
  };

  const handleAddRecord = (record: EmployeeRecord) => {
    setRecords(prev => [...prev, record]);
  };

  const handleLocaleChange = (newLocale: string) => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  return (
    <IntlProvider messages={messages[locale as keyof typeof messages]} locale={locale}>
      <div className="min-h-screen bg-gray-100">
        <Navigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          locale={locale}
          onLocaleChange={handleLocaleChange}
        />
        
        <div className="container mx-auto py-6 px-4">
          {activeTab === 'employees' && (
            <EmployeeList
              employees={employees}
              records={records}
              onDeleteEmployee={handleDeleteEmployee}
              onAddRecord={handleAddRecord}
              onAddEmployee={handleAddEmployee}
              onUpdateEmployee={handleUpdateEmployee}
            />
          )}
          
          {activeTab === 'salaries' && (
            <SalaryCalculations
              employees={employees}
              records={records}
              salaryCalculations={salaryCalculations}
              onCalculate={handleCalculateSalaries}
            />
          )}
          
          {activeTab === 'api' && <ApiDocs />}
          {activeTab === 'docs' && <Documentation />}
        </div>
      </div>
    </IntlProvider>
  );
}

export default App;