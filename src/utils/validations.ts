import type { Employee, LeaveRecord, MonthlyRecord } from '../types';

export const validateEmployee = (data: Partial<Employee>): string[] => {
  const errors: string[] = [];

  if (!data.name?.trim()) {
    errors.push('Name is required');
  } else if (data.name.length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  if (!data.position?.trim()) {
    errors.push('Position is required');
  }

  if (!data.pinfl?.trim()) {
    errors.push('PINFL is required');
  } else if (!/^\d{14}$/.test(data.pinfl)) {
    errors.push('PINFL must be exactly 14 digits');
  }

  if (!data.passportSeries?.trim()) {
    errors.push('Passport series is required');
  } else if (!/^[A-Z]{2}$/.test(data.passportSeries.toUpperCase())) {
    errors.push('Passport series must be exactly 2 letters');
  }

  if (!data.passportNumber?.trim()) {
    errors.push('Passport number is required');
  } else if (!/^\d{7}$/.test(data.passportNumber)) {
    errors.push('Passport number must be exactly 7 digits');
  }

  if (!data.dateOfBirth) {
    errors.push('Date of birth is required');
  } else {
    const dob = new Date(data.dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    if (age < 16) {
      errors.push('Employee must be at least 16 years old');
    }
    if (dob > today) {
      errors.push('Date of birth cannot be in the future');
    }
  }

  if (!data.rate) {
    errors.push('Rate is required');
  } else if (data.rate < 0) {
    errors.push('Rate cannot be negative');
  }

  if (!data.startDate) {
    errors.push('Start date is required');
  } else {
    const startDate = new Date(data.startDate);
    if (startDate > new Date()) {
      errors.push('Start date cannot be in the future');
    }
  }

  if (!data.taxRate && data.taxRate !== 0) {
    errors.push('Tax rate is required');
  } else if (data.taxRate < 0 || data.taxRate > 100) {
    errors.push('Tax rate must be between 0 and 100');
  }

  if (!data.agreement?.vacationDaysPerYear) {
    errors.push('Vacation days per year is required');
  } else if (data.agreement.vacationDaysPerYear < 0 || data.agreement.vacationDaysPerYear > 365) {
    errors.push('Vacation days must be between 0 and 365');
  }

  if (!data.agreement?.sickLeavePerYear) {
    errors.push('Sick leave days per year is required');
  } else if (data.agreement.sickLeavePerYear < 0 || data.agreement.sickLeavePerYear > 365) {
    errors.push('Sick leave days must be between 0 and 365');
  }

  if (!data.agreement?.overtimeRate) {
    errors.push('Overtime rate is required');
  } else if (data.agreement.overtimeRate < 1) {
    errors.push('Overtime rate must be at least 1x');
  }

  return errors;
};

// Rest of the validation functions remain unchanged
export const validateLeaveRecord = (
  data: Partial<LeaveRecord>,
  employee?: Employee,
  existingRecords?: LeaveRecord[]
): string[] => {
  const errors: string[] = [];

  if (!data.startDate || !data.endDate) {
    errors.push('Start and end dates are required');
  } else {
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    const today = new Date();

    if (startDate > endDate) {
      errors.push('Start date must be before end date');
    }

    if (employee?.startDate) {
      const employeeStartDate = new Date(employee.startDate);
      if (startDate < employeeStartDate) {
        errors.push('Leave cannot start before employment date');
      }
    }

    // Check for overlapping leave periods
    if (existingRecords) {
      const hasOverlap = existingRecords.some(record => {
        const recordStart = new Date(record.startDate);
        const recordEnd = new Date(record.endDate);
        return (
          (startDate >= recordStart && startDate <= recordEnd) ||
          (endDate >= recordStart && endDate <= recordEnd) ||
          (startDate <= recordStart && endDate >= recordEnd)
        );
      });

      if (hasOverlap) {
        errors.push('Leave period overlaps with existing leave records');
      }
    }
  }

  if (!data.type) {
    errors.push('Leave type is required');
  }

  // Validate against employee's annual leave allowance
  if (employee && data.type && data.days) {
    const currentYear = new Date().getFullYear();
    const yearRecords = existingRecords?.filter(
      record => 
        record.type === data.type && 
        new Date(record.startDate).getFullYear() === currentYear
    ) || [];
    
    const usedDays = yearRecords.reduce((sum, record) => sum + record.days, 0);
    const remainingDays = data.type === 'vacation' 
      ? employee.agreement.vacationDaysPerYear - usedDays
      : employee.agreement.sickLeavePerYear - usedDays;

    if (data.days > remainingDays) {
      errors.push(`Insufficient ${data.type} days remaining (${remainingDays} days left)`);
    }
  }

  return errors;
};

export const validateMonthlyRecord = (
  data: Partial<MonthlyRecord>,
  employee?: Employee,
  existingRecords?: MonthlyRecord[]
): string[] => {
  const errors: string[] = [];

  if (!data.month || !data.year) {
    errors.push('Month and year are required');
  } else {
    // Check for duplicate records
    const isDuplicate = existingRecords?.some(
      record => 
        record.employeeId === data.employeeId &&
        record.month === data.month &&
        record.year === data.year
    );

    if (isDuplicate) {
      errors.push('A record already exists for this month and year');
    }

    // Validate against employment start date
    if (employee?.startDate) {
      const recordDate = new Date(data.month);
      const employeeStartDate = new Date(employee.startDate);
      if (recordDate < employeeStartDate) {
        errors.push('Record date cannot be before employment start date');
      }
    }
  }

  if (!data.workDays && data.workDays !== 0) {
    errors.push('Work days is required');
  } else if (data.workDays < 0 || data.workDays > 31) {
    errors.push('Work days must be between 0 and 31');
  }

  if (!data.vacationDays && data.vacationDays !== 0) {
    errors.push('Vacation days is required');
  } else if (data.vacationDays < 0 || data.vacationDays > 31) {
    errors.push('Vacation days must be between 0 and 31');
  }

  if (!data.sickLeaveDays && data.sickLeaveDays !== 0) {
    errors.push('Sick leave days is required');
  } else if (data.sickLeaveDays < 0 || data.sickLeaveDays > 31) {
    errors.push('Sick leave days must be between 0 and 31');
  }

  if (!data.overtimeHours && data.overtimeHours !== 0) {
    errors.push('Overtime hours is required');
  } else if (data.overtimeHours < 0) {
    errors.push('Overtime hours cannot be negative');
  }

  if (!data.bonuses && data.bonuses !== 0) {
    errors.push('Bonuses amount is required');
  } else if (data.bonuses < 0) {
    errors.push('Bonuses cannot be negative');
  }

  if (!data.deductions && data.deductions !== 0) {
    errors.push('Deductions amount is required');
  } else if (data.deductions < 0) {
    errors.push('Deductions cannot be negative');
  }

  // Validate total days
  const totalDays = (data.workDays || 0) + (data.vacationDays || 0) + (data.sickLeaveDays || 0);
  if (totalDays > 31) {
    errors.push('Total days (work + vacation + sick) cannot exceed 31');
  }

  return errors;
};