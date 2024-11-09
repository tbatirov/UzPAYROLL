import { useState, useCallback } from 'react';

export function useFormValidation<T>(
  validateFn: (data: Partial<T>, ...args: any[]) => string[],
  onSubmit: (data: T) => void
) {
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = useCallback(
    (data: Partial<T>, ...validationArgs: any[]) => {
      const validationErrors = validateFn(data, ...validationArgs);
      setErrors(validationErrors);

      if (validationErrors.length === 0) {
        onSubmit(data as T);
        return true;
      }
      return false;
    },
    [validateFn, onSubmit]
  );

  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  return {
    errors,
    handleSubmit,
    clearErrors,
  };
}