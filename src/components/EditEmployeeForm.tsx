import React from 'react';
import { useIntl } from 'react-intl';
import { Save, X } from 'lucide-react';
import type { Employee } from '../types';

interface EditEmployeeFormProps {
  employee: Employee;
  onSave: (employee: Employee) => void;
  onCancel: () => void;
}

export function EditEmployeeForm({ employee, onSave, onCancel }: EditEmployeeFormProps) {
  const intl = useIntl();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const updatedEmployee: Employee = {
      ...employee,
      name: formData.get('name') as string,
      position: formData.get('position') as string,
      pinfl: formData.get('pinfl') as string,
      passportSeries: (formData.get('passportSeries') as string).toUpperCase(),
      passportNumber: formData.get('passportNumber') as string,
      dateOfBirth: formData.get('dateOfBirth') as string,
      paymentType: formData.get('paymentType') as 'salary' | 'hourly',
      paymentFrequency: formData.get('paymentFrequency') as 'monthly' | 'bimonthly',
      rate: Number(formData.get('rate')),
      startDate: formData.get('startDate') as string,
      taxRate: Number(formData.get('taxRate')),
      socialTaxRate: 12,
      inpsTaxRate: 1,
      agreement: {
        vacationDaysPerYear: Number(formData.get('vacationDays')),
        sickLeavePerYear: Number(formData.get('sickLeaveDays')),
        overtimeRate: Number(formData.get('overtimeRate')),
        paidLeaves: {
          marriage: Number(formData.get('marriageLeave')),
          bereavement: Number(formData.get('bereavementLeave')),
          paternity: Number(formData.get('paternityLeave')),
          maternity: Number(formData.get('maternityLeave')),
          study: Number(formData.get('studyLeave')),
          military: Number(formData.get('militaryLeave'))
        }
      }
    };

    onSave(updatedEmployee);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">
          {intl.formatMessage({ id: 'common.edit' })} - {employee.name}
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <X className="h-4 w-4" />
            {intl.formatMessage({ id: 'common.cancel' })}
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Save className="h-4 w-4" />
            {intl.formatMessage({ id: 'common.save' })}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {intl.formatMessage({ id: 'employee.form.name' })}
          </label>
          <input
            type="text"
            name="name"
            defaultValue={employee.name}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {intl.formatMessage({ id: 'employee.form.position' })}
          </label>
          <input
            type="text"
            name="position"
            defaultValue={employee.position}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {intl.formatMessage({ id: 'employee.form.pinfl' })}
          </label>
          <input
            type="text"
            name="pinfl"
            defaultValue={employee.pinfl}
            required
            pattern="[0-9]{14}"
            title="PINFL must be 14 digits"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {intl.formatMessage({ id: 'employee.form.passportSeries' })}
          </label>
          <input
            type="text"
            name="passportSeries"
            defaultValue={employee.passportSeries}
            required
            pattern="[A-Za-z]{2}"
            maxLength={2}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {intl.formatMessage({ id: 'employee.form.passportNumber' })}
          </label>
          <input
            type="text"
            name="passportNumber"
            defaultValue={employee.passportNumber}
            required
            pattern="[0-9]{7}"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {intl.formatMessage({ id: 'employee.form.dateOfBirth' })}
          </label>
          <input
            type="date"
            name="dateOfBirth"
            defaultValue={employee.dateOfBirth}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {intl.formatMessage({ id: 'employee.form.paymentType' })}
          </label>
          <select
            name="paymentType"
            defaultValue={employee.paymentType}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="salary">{intl.formatMessage({ id: 'employee.form.salary' })}</option>
            <option value="hourly">{intl.formatMessage({ id: 'employee.form.hourly' })}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {intl.formatMessage({ id: 'employee.form.paymentFrequency' })}
          </label>
          <select
            name="paymentFrequency"
            defaultValue={employee.paymentFrequency}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="monthly">{intl.formatMessage({ id: 'employee.form.monthly' })}</option>
            <option value="bimonthly">{intl.formatMessage({ id: 'employee.form.bimonthly' })}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {intl.formatMessage({ id: 'employee.form.rate' })}
          </label>
          <input
            type="number"
            name="rate"
            defaultValue={employee.rate}
            required
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {intl.formatMessage({ id: 'employee.form.startDate' })}
          </label>
          <input
            type="date"
            name="startDate"
            defaultValue={employee.startDate}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {intl.formatMessage({ id: 'employee.form.taxRate' })}
          </label>
          <input
            type="number"
            name="taxRate"
            defaultValue={employee.taxRate}
            required
            min="0"
            max="100"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {intl.formatMessage({ id: 'employee.form.vacationDays' })}
          </label>
          <input
            type="number"
            name="vacationDays"
            defaultValue={employee.agreement.vacationDaysPerYear}
            required
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {intl.formatMessage({ id: 'employee.form.sickLeaveDays' })}
          </label>
          <input
            type="number"
            name="sickLeaveDays"
            defaultValue={employee.agreement.sickLeavePerYear}
            required
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {intl.formatMessage({ id: 'employee.form.overtimeRate' })}
          </label>
          <input
            type="number"
            name="overtimeRate"
            defaultValue={employee.agreement.overtimeRate}
            required
            min="1"
            step="0.1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {intl.formatMessage({ id: 'employee.form.marriageLeave' })}
          </label>
          <input
            type="number"
            name="marriageLeave"
            defaultValue={employee.agreement.paidLeaves.marriage}
            required
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {intl.formatMessage({ id: 'employee.form.bereavementLeave' })}
          </label>
          <input
            type="number"
            name="bereavementLeave"
            defaultValue={employee.agreement.paidLeaves.bereavement}
            required
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {intl.formatMessage({ id: 'employee.form.paternityLeave' })}
          </label>
          <input
            type="number"
            name="paternityLeave"
            defaultValue={employee.agreement.paidLeaves.paternity}
            required
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {intl.formatMessage({ id: 'employee.form.maternityLeave' })}
          </label>
          <input
            type="number"
            name="maternityLeave"
            defaultValue={employee.agreement.paidLeaves.maternity}
            required
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {intl.formatMessage({ id: 'employee.form.studyLeave' })}
          </label>
          <input
            type="number"
            name="studyLeave"
            defaultValue={employee.agreement.paidLeaves.study}
            required
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {intl.formatMessage({ id: 'employee.form.militaryLeave' })}
          </label>
          <input
            type="number"
            name="militaryLeave"
            defaultValue={employee.agreement.paidLeaves.military}
            required
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    </form>
  );
}