import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Calculator, Calendar } from 'lucide-react';
import type { Employee, EmployeeRecord } from '../types';
import { calculateTaxes } from '../utils/calculations';

interface RecordFormProps {
  employee: Employee;
  records: EmployeeRecord[];
  onAddRecord: (record: EmployeeRecord) => void;
}

export function RecordForm({ employee, records, onAddRecord }: RecordFormProps) {
  const intl = useIntl();
  const [recordType, setRecordType] = useState<'leave' | 'overtime' | 'bonus' | 'deduction'>('leave');
  const [amount, setAmount] = useState('');
  const [leaveType, setLeaveType] = useState<'vacation' | 'sick' | 'marriage' | 'bereavement' | 'paternity' | 'maternity' | 'study' | 'military' | 'unpaid'>('vacation');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let recordAmount = 0;
    let recordDays = 0;
    let isPaid = false;

    if (recordType === 'leave') {
      const start = new Date(startDate);
      const end = new Date(endDate);
      recordDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      isPaid = leaveType !== 'unpaid';
      
      // Calculate daily rate for paid leaves
      if (isPaid) {
        const dailyRate = employee.rate / 22; // Assuming 22 working days per month
        recordAmount = dailyRate * recordDays;
      }
    } else {
      recordAmount = Number(amount);
    }

    // Calculate taxes for the record
    const taxes = calculateTaxes({
      amount: recordAmount,
      employee,
      type: recordType
    });

    const record: EmployeeRecord = {
      id: crypto.randomUUID(),
      employeeId: employee.id,
      type: recordType,
      amount: recordAmount,
      leaveType: recordType === 'leave' ? leaveType : undefined,
      startDate: recordType === 'leave' ? startDate : undefined,
      endDate: recordType === 'leave' ? endDate : undefined,
      days: recordType === 'leave' ? recordDays : undefined,
      date: new Date().toISOString().split('T')[0],
      description,
      isPaid,
      taxes
    };

    onAddRecord(record);
    resetForm();
  };

  const resetForm = () => {
    setAmount('');
    setStartDate('');
    setEndDate('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {intl.formatMessage({ id: 'record.form.type' })}
          </label>
          <select
            value={recordType}
            onChange={(e) => setRecordType(e.target.value as any)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="leave">{intl.formatMessage({ id: 'record.form.leave' })}</option>
            <option value="overtime">{intl.formatMessage({ id: 'record.form.overtime' })}</option>
            <option value="bonus">{intl.formatMessage({ id: 'record.form.bonus' })}</option>
            <option value="deduction">{intl.formatMessage({ id: 'record.form.deduction' })}</option>
          </select>
        </div>

        {recordType === 'leave' ? (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {intl.formatMessage({ id: 'leave.type' })}
              </label>
              <select
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value as any)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="vacation">{intl.formatMessage({ id: 'leave.vacation' })}</option>
                <option value="sick">{intl.formatMessage({ id: 'leave.sick' })}</option>
                <option value="marriage">{intl.formatMessage({ id: 'leave.marriage' })}</option>
                <option value="bereavement">{intl.formatMessage({ id: 'leave.bereavement' })}</option>
                <option value="paternity">{intl.formatMessage({ id: 'leave.paternity' })}</option>
                <option value="maternity">{intl.formatMessage({ id: 'leave.maternity' })}</option>
                <option value="study">{intl.formatMessage({ id: 'leave.study' })}</option>
                <option value="military">{intl.formatMessage({ id: 'leave.military' })}</option>
                <option value="unpaid">{intl.formatMessage({ id: 'leave.unpaid' })}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {intl.formatMessage({ id: 'common.startDate' })}
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {intl.formatMessage({ id: 'common.endDate' })}
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {intl.formatMessage({ id: 'common.amount' })}
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
              min="0"
            />
          </div>
        )}

        <div className="col-span-full">
          <label className="block text-sm font-medium text-gray-700">
            {intl.formatMessage({ id: 'common.notes' })}
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {recordType === 'leave' ? (
            <Calendar className="h-5 w-5" />
          ) : (
            <Calculator className="h-5 w-5" />
          )}
          <span>{intl.formatMessage({ id: 'record.form.submit' })}</span>
        </button>
      </div>
    </form>
  );
}