import { validateValue } from "../src/utils/validators";
import { ValidationRule } from "../src/types";

describe("validateValue", () => {
  it("returns null if all validations pass", () => {
    const rules: ValidationRule = { required: true, minLength: 3 };
    const result = validateValue("hello", rules);
    expect(result).toBeNull();
  });

  it("returns error for empty required field", () => {
    const rules: ValidationRule = { required: true };
    const result = validateValue("", rules);
    expect(result).toBe("This field is required");
  });

  it("returns error if minLength not satisfied", () => {
    const rules: ValidationRule = { minLength: 5 };
    const result = validateValue("abc", rules);
    expect(result).toBe("Minimum length is 5");
  });

  it("returns error if pattern does not match", () => {
    const rules: ValidationRule = { pattern: /^[A-Z]+$/ };
    const result = validateValue("abc", rules);
    expect(result).toBe("Invalid format");
  });
});
