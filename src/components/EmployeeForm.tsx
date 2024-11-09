import React from 'react';
import { UserPlus } from 'lucide-react';
import { useIntl } from 'react-intl';
import type { Employee } from '../types';

interface EmployeeFormProps {
  onAddEmployee: (employee: Employee) => void;
}

export function EmployeeForm({ onAddEmployee }: EmployeeFormProps) {
  const intl = useIntl();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const passportSeries = formData.get('passportSeries');
    
    const employee: Omit<Employee, 'id'> = {
      name: formData.get('name') as string,
      position: formData.get('position') as string,
      pinfl: formData.get('pinfl') as string,
      passportSeries: passportSeries ? (passportSeries as string).toUpperCase() : '',
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

    onAddEmployee({
      id: crypto.randomUUID(),
      ...employee
    });

    e.currentTarget.reset();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">
        {intl.formatMessage({ id: 'employee.form.title' })}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {intl.formatMessage({ id: 'employee.form.name' })}
            </label>
            <input
              type="text"
              name="name"
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
              required
              pattern="[A-Za-z]{2}"
              maxLength={2}
              title="Passport series must be 2 letters"
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
              required
              pattern="[0-9]{7}"
              title="Passport number must be 7 digits"
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
              required
              min="0"
              max="100"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {intl.formatMessage({ id: 'employee.form.socialTaxRate' })}
            </label>
            <input
              type="number"
              name="socialTaxRate"
              disabled
              value="12"
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {intl.formatMessage({ id: 'employee.form.inpsTaxRate' })}
            </label>
            <input
              type="number"
              name="inpsTaxRate"
              disabled
              value="1"
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {intl.formatMessage({ id: 'employee.form.vacationDays' })}
            </label>
            <input
              type="number"
              name="vacationDays"
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
              required
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <UserPlus className="h-5 w-5" />
            <span>{intl.formatMessage({ id: 'employee.form.submit' })}</span>
          </button>
        </div>
      </form>
    </div>
  );
}