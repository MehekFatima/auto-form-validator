export const defaultValidationPatterns: Record<string, RegExp> = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  number: /^-?\d+(\.\d+)?$/,
  tel: /^\+?[1-9]\d{1,14}$/,
  url: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,
  date: /^\d{4}-\d{2}-\d{2}$/,
  time: /^([01]\d|2[0-3]):([0-5]\d)$/,
  color: /^#([0-9A-F]{3}){1,2}$/i,
};
