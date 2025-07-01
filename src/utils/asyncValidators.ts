/**
 * Creates an async validator that checks username availability.
 * 
 * @param checkFn - A function that returns a Promise resolving to `true` if available, else `false`.
 * @param message - Optional custom error message.
 */
export const createUsernameAvailableValidator = (
  checkFn: (username: string) => Promise<boolean>,
  message?: string
) => {
  return async (username: string): Promise<string | null> => {
    if (!username.trim()) return null; // Let required rule handle empty case

    try {
      const isAvailable = await checkFn(username);
      return isAvailable ? null : message || "Username is already taken";
    } catch {
      return null; // or optionally: return message || "Validation service failed";
    }
  };
};

/**
 * Creates an async validator that validates email domain against a list of allowed domains.
 *
 * @param allowedDomains - List of allowed email domains (e.g., ["gmail.com"]).
 * @param message - Optional custom error message.
 */
export const createEmailDomainValidator = (
  allowedDomains: string[],
  message?: string
) => {
  return async (email: string): Promise<string | null> => {
    if (!email.includes("@")) return null; // Let pattern rule handle this

    const domain = email.split("@")[1].toLowerCase();
    const isAllowed = allowedDomains.some(d => d.toLowerCase() === domain);

    return isAllowed ? null : message || "Email domain is not allowed";
  };
};
