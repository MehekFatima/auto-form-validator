import React, { useRef, useState, useEffect, useCallback } from "react";
import { validateValue } from "../utils/validators";
import { ValidationRule, Language, ValidationMessages } from "../types";
import { messagesMap } from "../utils/messages";
import { defaultValidationPatterns } from "../components/validationPatterns";

type Errors = Record<string, string | null>;

type RegisteredField = {
  ref: React.RefObject<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null>;
  rules: ValidationRule;
};

function debounce<T extends (...args: any[]) => void>(func: T, wait = 300): T {
  let timeout: ReturnType<typeof setTimeout>;
  return ((...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T;
}

export const useAutoValidator = (
  manualSchema: Record<string, ValidationRule> = {},
  language: Language = "en"
) => {
  const fields = useRef<Record<string, RegisteredField>>({});
  const [errors, setErrors] = useState<Errors>({});
  const messages: ValidationMessages = messagesMap[language];

  const extractRules = useCallback(
    (el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) => {
      const rules: ValidationRule = {};

      if (el.required) rules.required = true;
      if ("minLength" in el && el.minLength > 0) rules.minLength = el.minLength;
      if ("maxLength" in el && el.maxLength > 0) rules.maxLength = el.maxLength;
      if ("pattern" in el && el.pattern) rules.pattern = new RegExp(el.pattern);

      const typePattern = defaultValidationPatterns[el.type];
      if (typePattern) {
        rules.pattern = typePattern;
      }

      return rules;
    },
    []
  );

  const getField = useCallback((name: string) => {
    if (!fields.current[name]) {
      const ref = React.createRef<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >();
      fields.current[name] = {
        ref,
        rules: {},
      };
    }
    return fields.current[name];
  }, []);

  useEffect(() => {
    Object.entries(fields.current).forEach(([name, { ref }]) => {
      const el = ref.current;
      if (el) {
        const extractedRules = extractRules(el);
        fields.current[name].rules = extractedRules;
      }
    });
  }, [extractRules]);

  const validateAndSetError = async (name: string) => {
    const field = fields.current[name];
    if (!field || !field.ref.current) return;
    const rules = manualSchema[name] || field.rules;
    const value = field.ref.current.value;
    const error = await validateValue(value, rules, messages);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const debouncedValidateAndSetError = useCallback(
    debounce(validateAndSetError, 300),
    [manualSchema, messages]
  );

  const register = (name: string) => {
    const field = getField(name);

    const handleBlur = async () => {
      await validateAndSetError(name);
    };

    const handleChange = () => {
      debouncedValidateAndSetError(name);
    };

    return {
      name,
      ref: (el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null) => {
        field.ref.current = el;
      },
      onBlur: handleBlur,
      onChange: handleChange,
    };
  };

  const validateForm = async (values: Record<string, string>) => {
    let valid = true;
    const newErrors: Errors = {};

    for (const name in values) {
      const field = fields.current[name];
      const rules = manualSchema[name] || field?.rules || {};
      const value = values[name];
      const error = await validateValue(value, rules, messages);
      newErrors[name] = error;
      if (error) valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const resetErrors = () => setErrors({});

  return {
    register,
    errors,
    validateForm,
    resetErrors,
  };
};
