import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Trash, User, Calendar, CreditCard, Briefcase, Percent, Edit2, FileText } from 'lucide-react';
import { useIntl } from 'react-intl';
import { RecordForm } from './RecordForm';
import { LeaveBalanceDisplay } from './LeaveBalanceDisplay';
import { EmployeeForm } from './EmployeeForm';
import { EditEmployeeForm } from './EditEmployeeForm';
import { ExcelImport } from './ExcelImport';
import { formatCurrency } from '../utils/format';
import type { Employee, EmployeeRecord } from '../types';

interface EmployeeListProps {
  employees: Employee[];
  records: EmployeeRecord[];
  onDeleteEmployee: (id: string) => void;
  onAddRecord: (record: EmployeeRecord) => void;
  onAddEmployee: (employee: Employee) => void;
  onUpdateEmployee: (employee: Employee) => void;
}

export function EmployeeList({ 
  employees, 
  records,
  onDeleteEmployee,
  onAddRecord,
  onAddEmployee,
  onUpdateEmployee
}: EmployeeListProps) {
  const intl = useIntl();
  const [expandedEmployeeId, setExpandedEmployeeId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEmployeeId, setEditingEmployeeId] = useState<string | null>(null);

  const toggleEmployee = (employeeId: string) => {
    setExpandedEmployeeId(expandedEmployeeId === employeeId ? null : employeeId);
  };

  const getEmployeeRecords = (employeeId: string) => {
    return records.filter(record => record.employeeId === employeeId);
  };

  const handleImportEmployees = (importedEmployees: Omit<Employee, 'id'>[]) => {
    importedEmployees.forEach(employee => {
      onAddEmployee({
        ...employee,
        id: crypto.randomUUID()
      });
    });
  };

  const handleSaveEdit = (updatedEmployee: Employee) => {
    onUpdateEmployee(updatedEmployee);
    setEditingEmployeeId(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <ExcelImport onImport={handleImportEmployees} />
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
        >
          <User className="h-4 w-4" />
          {showAddForm ? intl.formatMessage({ id: 'common.cancel' }) : intl.formatMessage({ id: 'employee.form.title' })}
        </button>
      </div>

      {showAddForm && (
        <EmployeeForm onAddEmployee={onAddEmployee} />
      )}

      {employees.map((employee) => (
        <div key={employee.id} className="bg-white rounded-lg shadow">
          {editingEmployeeId === employee.id ? (
            <EditEmployeeForm
              employee={employee}
              onSave={handleSaveEdit}
              onCancel={() => setEditingEmployeeId(null)}
            />
          ) : (
            <>
              <div 
                className="p-4 flex items-center justify-between cursor-pointer"
                onClick={() => toggleEmployee(employee.id)}
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <User className="h-5 w-5 text-gray-600" />
                    {employee.name}
                  </h3>
                  <div className="text-sm text-gray-500 space-y-1">
                    <p className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      {employee.position}
                    </p>
                    <p className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      {formatCurrency(employee.rate)}/{employee.paymentType === 'hourly' ? 'hour' : 'month'} ({employee.paymentFrequency})
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingEmployeeId(employee.id);
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                    title={intl.formatMessage({ id: 'common.edit' })}
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteEmployee(employee.id);
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                    title={intl.formatMessage({ id: 'common.delete' })}
                  >
                    <Trash className="h-5 w-5" />
                  </button>
                  {expandedEmployeeId === employee.id ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </div>
              </div>
              
              {expandedEmployeeId === employee.id && (
                <div className="border-t border-gray-200 p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-700 flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Personal Information
                      </h4>
                      <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                        <p className="text-sm">
                          <span className="text-gray-500">Date of Birth:</span> {employee.dateOfBirth}
                        </p>
                        <p className="text-sm">
                          <span className="text-gray-500">PINFL:</span> {employee.pinfl}
                        </p>
                        <p className="text-sm">
                          <span className="text-gray-500">Passport:</span> {employee.passportSeries}{employee.passportNumber}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-700 flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        Employment Details
                      </h4>
                      <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                        <p className="text-sm">
                          <span className="text-gray-500">Start Date:</span> {employee.startDate}
                        </p>
                        <p className="text-sm">
                          <span className="text-gray-500">Payment Type:</span> {employee.paymentType}
                        </p>
                        <p className="text-sm">
                          <span className="text-gray-500">Payment Frequency:</span> {employee.paymentFrequency}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-700 flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Compensation
                      </h4>
                      <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                        <p className="text-sm">
                          <span className="text-gray-500">Base Rate:</span> {formatCurrency(employee.rate)}
                        </p>
                        <p className="text-sm">
                          <span className="text-gray-500">Overtime Rate:</span> {employee.agreement.overtimeRate}x
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-700 flex items-center gap-2">
                        <Percent className="h-4 w-4" />
                        Tax Information
                      </h4>
                      <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                        <p className="text-sm">
                          <span className="text-gray-500">Income Tax:</span> {employee.taxRate}%
                        </p>
                        <p className="text-sm">
                          <span className="text-gray-500">Social Tax:</span> {employee.socialTaxRate}%
                        </p>
                        <p className="text-sm">
                          <span className="text-gray-500">INPS Tax:</span> {employee.inpsTaxRate}%
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-700 flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Annual Leave
                      </h4>
                      <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                        <p className="text-sm">
                          <span className="text-gray-500">Vacation Days/Year:</span> {employee.agreement.vacationDaysPerYear}
                        </p>
                        <p className="text-sm">
                          <span className="text-gray-500">Sick Leave Days/Year:</span> {employee.agreement.sickLeavePerYear}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-700 flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Other Leave Entitlements
                      </h4>
                      <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <p className="text-sm">
                            <span className="text-gray-500">Marriage:</span> {employee.agreement.paidLeaves.marriage} days
                          </p>
                          <p className="text-sm">
                            <span className="text-gray-500">Bereavement:</span> {employee.agreement.paidLeaves.bereavement} days
                          </p>
                          <p className="text-sm">
                            <span className="text-gray-500">Paternity:</span> {employee.agreement.paidLeaves.paternity} days
                          </p>
                          <p className="text-sm">
                            <span className="text-gray-500">Maternity:</span> {employee.agreement.paidLeaves.maternity} days
                          </p>
                          <p className="text-sm">
                            <span className="text-gray-500">Study:</span> {employee.agreement.paidLeaves.study} days
                          </p>
                          <p className="text-sm">
                            <span className="text-gray-500">Military:</span> {employee.agreement.paidLeaves.military} days
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <LeaveBalanceDisplay 
                      employee={employee}
                      records={getEmployeeRecords(employee.id)}
                    />
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="font-medium text-gray-700 mb-4">Add New Record</h4>
                    <RecordForm
                      employee={employee}
                      records={getEmployeeRecords(employee.id)}
                      onAddRecord={onAddRecord}
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}