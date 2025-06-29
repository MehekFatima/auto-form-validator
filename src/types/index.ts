export type ValidationRule = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
  async?: (value: any) => Promise<string | null>;
};

export type ValidationSchema = Record<string, ValidationRule>;

export type Errors = Record<string, string | null>;
