import { api } from './api';
import type { SalaryCalculation } from '../types';

export const salaryService = {
  getByMonth: async (month: string) => {
    const response = await api.get<{ salaries: SalaryCalculation[] }>(`/salaries/month/${month}`);
    return response.data.salaries;
  },

  getByEmployee: async (employeeId: string) => {
    const response = await api.get<{ salaries: SalaryCalculation[] }>(`/salaries/employee/${employeeId}`);
    return response.data.salaries;
  },

  calculate: async (employeeId: string, month: string) => {
    const response = await api.post<SalaryCalculation>('/salaries/calculate', { employeeId, month });
    return response.data;
  },

  getReport: async (startMonth: string, endMonth: string) => {
    const response = await api.get<{ report: SalaryCalculation[] }>('/salaries/report', {
      params: { startMonth, endMonth }
    });
    return response.data.report;
  }
};