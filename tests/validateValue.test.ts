import { validateValue } from "../src/utils/validators";

describe("validateValue", () => {
  const messages = {
    required: "Required",
    minLength: (n: number) => `Min ${n}`,
    maxLength: (n: number) => `Max ${n}`,
    pattern: "Invalid format",
    async: "Async failed",
  };

  it("validates required", async () => {
    const result = await validateValue("", { required: true }, messages);
    expect(result).toBe("Required");
  });

  it("validates minLength", async () => {
    const result = await validateValue("ab", { minLength: 5 }, messages);
    expect(result).toBe("Min 5");
  });

  it("validates maxLength", async () => {
    const result = await validateValue("abcdef", { maxLength: 3 }, messages);
    expect(result).toBe("Max 3");
  });

  it("validates pattern", async () => {
    const result = await validateValue("abc", { pattern: /^[0-9]+$/ }, messages);
    expect(result).toBe("Invalid format");
  });

  it("validates async", async () => {
    const result = await validateValue("admin", {
      async: async (v) => (v === "admin" ? "Username taken" : null),
    }, messages);
    expect(result).toBe("Username taken");
  });

  it("returns null if no error", async () => {
    const result = await validateValue("valid", {}, messages);
    expect(result).toBeNull();
  });
});
