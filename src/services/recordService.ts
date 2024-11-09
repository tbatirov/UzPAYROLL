import { api } from './api';
import type { EmployeeRecord } from '../types';

export const recordService = {
  getByEmployee: async (employeeId: string) => {
    const response = await api.get<{ records: EmployeeRecord[] }>(`/records/employee/${employeeId}`);
    return response.data.records;
  },

  getByType: async (type: EmployeeRecord['type']) => {
    const response = await api.get<{ records: EmployeeRecord[] }>(`/records/type/${type}`);
    return response.data.records;
  },

  create: async (record: Omit<EmployeeRecord, 'id'>) => {
    const response = await api.post<EmployeeRecord>('/records', record);
    return response.data;
  },

  update: async (id: string, record: Omit<EmployeeRecord, 'id'>) => {
    const response = await api.put<EmployeeRecord>(`/records/${id}`, record);
    return response.data;
  },

  delete: async (id: string) => {
    await api.delete(`/records/${id}`);
  }
};