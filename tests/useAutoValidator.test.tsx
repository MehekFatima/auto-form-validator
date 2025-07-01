import React from "react";
import { renderHook, act } from "@testing-library/react";
import { useAutoValidator } from "../src/hooks/useAutoValidator";
import { validateValue } from "../src/utils/validators";

// Mock validateValue to control validation results
jest.mock("../src/utils/validators", () => ({
  validateValue: jest.fn(),
}));


describe("useAutoValidator hook", () => {
  beforeEach(() => {
    (validateValue as jest.Mock).mockReset();
  });

  it("register returns handlers and ref function", () => {
    const { result } = renderHook(() => useAutoValidator());

    const reg = result.current.register("username");
    expect(reg.name).toBe("username");
    expect(typeof reg.onBlur).toBe("function");
    expect(typeof reg.onChange).toBe("function");
    expect(typeof reg.ref).toBe("function");
  });

  it("validateAndSetError updates errors state on validateForm", async () => {
    (validateValue as jest.Mock).mockImplementation(async (value) => {
      if (value === "valid") return null;
      return "Error message";
    });

    const { result } = renderHook(() => useAutoValidator());

    const values = {
      username: "invalid",
      email: "valid",
    };

    await act(async () => {
      const isValid = await result.current.validateForm(values);
      expect(isValid).toBe(false);
    });

    expect(result.current.errors.username).toBe("Error message");
    expect(result.current.errors.email).toBe(null);
  });

  it("resetErrors clears errors", async () => {
    (validateValue as jest.Mock).mockResolvedValue("Error");

    const { result } = renderHook(() => useAutoValidator());

    await act(async () => {
      await result.current.validateForm({ username: "test" });
    });

    expect(result.current.errors.username).toBe("Error");

    act(() => {
      result.current.resetErrors();
    });

    expect(result.current.errors).toEqual({});
  });

  it("handles manual schema overriding extracted rules", async () => {
    (validateValue as jest.Mock).mockResolvedValue(null);

    const manualSchema = {
      username: { required: true, minLength: 5 },
    };

    const { result } = renderHook(() => useAutoValidator(manualSchema));

    const fieldRef = { current: { value: "abc" } };

    // Manually register a field with ref
    act(() => {
      const reg = result.current.register("username");
      reg.ref(fieldRef.current as any);
    });

    // Force validation (simulate blur)
    await act(async () => {
      await result.current.validateForm({ username: "abc" });
    });

    // Should call validateValue with manualSchema rules (minLength: 5)
    expect(validateValue).toHaveBeenCalledWith(
      "abc",
      manualSchema.username,
      expect.any(Object)
    );
  });
});
