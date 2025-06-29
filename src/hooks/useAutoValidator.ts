import { useState, useCallback } from "react";
import { ValidationSchema, Errors } from "../types";
import { validateValue } from "../utils/validators";

interface UseAutoValidatorResult {
  register: (fieldName: string) => {
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  };
  errors: Errors;
  isValid: boolean;
  validateForm: (values: Record<string, any>) => boolean;
}

export function useAutoValidator(schema?: ValidationSchema): UseAutoValidatorResult {
  const [errors, setErrors] = useState<Errors>({});
  const [isValid, setIsValid] = useState<boolean>(true);

  const validateField = useCallback(
    (name: string, value: any): boolean => {
      if (!schema) return true;

      const rules = schema[name];
      const error = rules ? validateValue(value, rules) : null;

      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));

      return error === null;
    },
    [schema]
  );

  const register = (name: string) => ({
    name,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      validateField(name, value);
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
      const value = e.target.value;
      validateField(name, value);
    },
  });

  const validateForm = (values: Record<string, any>): boolean => {
    if (!schema) return true;

    let allValid = true;
    const newErrors: Errors = {};

    for (const field in schema) {
      const value = values[field];
      const error = validateValue(value, schema[field]);
      newErrors[field] = error;

      if (error) allValid = false;
    }

    setErrors(newErrors);
    setIsValid(allValid);
    return allValid;
  };

  return { register, errors, isValid, validateForm };
}
