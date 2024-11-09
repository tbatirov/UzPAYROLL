import React from 'react';
import { useIntl } from 'react-intl';
import type { Employee, EmployeeRecord } from '../types';

interface LeaveBalanceDisplayProps {
  employee: Employee;
  records: EmployeeRecord[];
}

const leaveTypeConfig = [
  { type: 'vacation', colorClass: 'blue' },
  { type: 'sick', colorClass: 'red' },
  { type: 'marriage', colorClass: 'pink' },
  { type: 'bereavement', colorClass: 'gray' },
  { type: 'paternity', colorClass: 'green' },
  { type: 'maternity', colorClass: 'purple' },
  { type: 'study', colorClass: 'yellow' },
  { type: 'military', colorClass: 'orange' }
] as const;

export function LeaveBalanceDisplay({ employee, records }: LeaveBalanceDisplayProps) {
  const intl = useIntl();

  const calculateLeaveBalance = (type: string) => {
    const totalAllowed = employee.agreement.paidLeaves[type as keyof typeof employee.agreement.paidLeaves] || 0;
    const used = records
      .filter(record => record.type === 'leave' && record.leaveType === type)
      .reduce((sum, record) => sum + (record.days || 0), 0);
    
    return {
      total: totalAllowed,
      used,
      remaining: totalAllowed - used
    };
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-medium mb-4">
        {intl.formatMessage({ id: 'leave.title' })}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {leaveTypeConfig.map(({ type, colorClass }) => {
          const balance = calculateLeaveBalance(type);
          return (
            <div key={type} className={`p-4 bg-${colorClass}-50 rounded-lg`}>
              <h4 className={`text-sm font-medium text-${colorClass}-800 mb-2`}>
                {intl.formatMessage({ id: `leave.${type}` })}
              </h4>
              <div className={`text-${colorClass}-600 text-sm`}>
                <div className="flex justify-between">
                  <span>{intl.formatMessage({ id: 'leave.total' })}:</span>
                  <span className="font-medium">{balance.total}</span>
                </div>
                <div className="flex justify-between">
                  <span>{intl.formatMessage({ id: 'leave.used' })}:</span>
                  <span className="font-medium">{balance.used}</span>
                </div>
                <div className="flex justify-between">
                  <span>{intl.formatMessage({ id: 'leave.remaining' })}:</span>
                  <span className="font-medium">{balance.remaining}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}