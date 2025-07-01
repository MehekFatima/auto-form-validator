import { ValidationRule, ValidationMessages } from "../types";

export const validateValue = async (
  value: string,
  rules: ValidationRule,
  messages: ValidationMessages
): Promise<string | null> => {
  if (rules.required && !value.trim()) {
    return typeof rules.required === "object" && rules.required.message
      ? rules.required.message
      : messages.required;
  }

  if (rules.minLength && value.length < (typeof rules.minLength === "object" ? rules.minLength.value : rules.minLength)) {
    const min = typeof rules.minLength === "object" ? rules.minLength.value : rules.minLength;
    return typeof rules.minLength === "object" && rules.minLength.message
      ? rules.minLength.message
      : messages.minLength(min);
  }

  if (rules.maxLength && value.length > (typeof rules.maxLength === "object" ? rules.maxLength.value : rules.maxLength)) {
    const max = typeof rules.maxLength === "object" ? rules.maxLength.value : rules.maxLength;
    return typeof rules.maxLength === "object" && rules.maxLength.message
      ? rules.maxLength.message
      : messages.maxLength(max);
  }

  if (rules.pattern && !(typeof rules.pattern === "object" && "test" in rules.pattern ? rules.pattern.test(value) : (rules.pattern as unknown as RegExp).test(value))) {
    if (typeof rules.pattern === "object" && "message" in rules.pattern && rules.pattern.message) {
      return rules.pattern.message;
    }
    return messages.pattern;
  }

  if (rules.custom) {
    const result = rules.custom(value);
    if (result) return result;
  }

  if (rules.async) {
    const asyncError = await rules.async(value);
    if (asyncError) return asyncError || messages.async!;
  }

  return null;
};
