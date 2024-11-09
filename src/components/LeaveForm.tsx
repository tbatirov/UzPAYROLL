import React from 'react';
import { Calendar } from 'lucide-react';
import type { LeaveRecord } from '../types';

interface LeaveFormProps {
  employeeId: string;
  onSubmit: (record: Omit<LeaveRecord, 'id'>) => void;
}

export default function LeaveForm({ employeeId, onSubmit }: LeaveFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const startDate = formData.get('startDate') as string;
    const endDate = formData.get('endDate') as string;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
    const record: Omit<LeaveRecord, 'id'> = {
      employeeId,
      type: formData.get('type') as 'vacation' | 'sick',
      startDate,
      endDate,
      days,
      status: 'pending',
      notes: formData.get('notes') as string,
    };
    
    onSubmit(record);
    e.currentTarget.reset();
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Add Leave Record</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            name="type"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="vacation">Vacation</option>
            <option value="sick">Sick Leave</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            name="startDate"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            name="endDate"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Notes</label>
          <textarea
            name="notes"
            rows={2}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="flex items-center space-x-2 w-full justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <Calendar className="h-4 w-4" />
          <span>Add Leave</span>
        </button>
      </form>
    </div>
  );
}