export type RuleWithMessage<T> = T | { value: T; message?: string };

export type ValidationRule = {
  required?: boolean | { value: boolean; message?: string };
  minLength?: number | { value: number; message?: string };
  maxLength?: number | { value: number; message?: string };
  pattern?: RegExp | { value: RegExp; message?: string };
  custom?: (value: any) => string | null;
  async?: (value: any) => Promise<string | null>;
};

export type ValidationSchema = Record<string, ValidationRule>;

export type Errors = Record<string, string | null>;

export type Language = "en" | "hi";

export type ValidationMessages = {
  required: string;
  minLength: (num: number) => string;
  maxLength: (num: number) => string;
  pattern: string;
  custom?: string;
  async?: string;
};
