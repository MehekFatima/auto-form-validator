import { renderHook, act } from "@testing-library/react";
import { useAutoValidator } from "../src/hooks/useAutoValidator";
import { waitFor } from "@testing-library/react";
import React from "react";

describe("useAutoValidator", () => {
  it("registers field and validates on change", async () => {
    const mockAsyncValidator = jest.fn(async () => "Taken");

    const wrapper = ({ children }: any) => <>{children}</>;
    const { result } = renderHook(() =>
      useAutoValidator({
        username: { async: mockAsyncValidator }
      }),
      { wrapper }
    );

    const props = result.current.register("username");
    const input = document.createElement("input");
    input.value = "admin";
    props.ref.current = input;

    await act(async () => {
      await props.onChange();
    });

    await waitFor(() => {
      expect(result.current.errors.username).toBe("Taken");
    });
  });
});
