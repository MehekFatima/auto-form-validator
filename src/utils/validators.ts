import { ValidationRule } from "../types";

export function validateValue(value: any, rules: ValidationRule): string | null {
  if (rules.required && !value) return "This field is required";
  if (rules.minLength && value.length < rules.minLength)
    return `Minimum length is ${rules.minLength}`;
  if (rules.maxLength && value.length > rules.maxLength)
    return `Maximum length is ${rules.maxLength}`;
  if (rules.pattern && !rules.pattern.test(value)) return "Invalid format";
  if (rules.custom) return rules.custom(value);
  return null;
}
