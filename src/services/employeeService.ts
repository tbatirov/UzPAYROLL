import { api } from './api';
import type { Employee } from '../types';

export const employeeService = {
  getAll: async () => {
    const response = await api.get<{ employees: Employee[] }>('/employees');
    return response.data.employees;
  },

  getById: async (id: string) => {
    const response = await api.get<{ employee: Employee }>(`/employees/${id}`);
    return response.data.employee;
  },

  create: async (employee: Omit<Employee, 'id'>) => {
    const response = await api.post<Employee>('/employees', employee);
    return response.data;
  },

  update: async (id: string, employee: Omit<Employee, 'id'>) => {
    const response = await api.put<Employee>(`/employees/${id}`, employee);
    return response.data;
  },

  delete: async (id: string) => {
    await api.delete(`/employees/${id}`);
  },

  import: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post<{ employees: Employee[] }>('/employees/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.employees;
  }
};