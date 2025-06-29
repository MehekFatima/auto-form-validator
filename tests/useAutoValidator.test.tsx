import React from "react";  
import { render, fireEvent, screen } from "@testing-library/react";
import { useAutoValidator } from "../src/hooks/useAutoValidator";

function TestComponent({ schema }: { schema: any }) {
  const { register, errors, validateForm } = useAutoValidator(schema);

  return (
    <>
      <input {...register("username")} data-testid="username-input" />
      <span data-testid="error">{errors.username || ""}</span>
      <button
        onClick={() => validateForm({ username: (screen.getByTestId("username-input") as HTMLInputElement).value })}
      >
        Validate
      </button>
    </>
  );
}

test("validates username field", () => {
  const schema = { username: { required: true, minLength: 3 } };

  render(<TestComponent schema={schema} />);
  const input = screen.getByTestId("username-input");
  const error = screen.getByTestId("error");
  const button = screen.getByRole("button", { name: /validate/i });

  // Initially no error
  expect(error.textContent).toBe("");

  // Change input to invalid value
  fireEvent.change(input, { target: { value: "ab" } });
  fireEvent.blur(input);
  fireEvent.click(button);

  expect(error.textContent).toBe("Minimum length is 3");

  // Change input to valid value
  fireEvent.change(input, { target: { value: "abc" } });
  fireEvent.blur(input);
  fireEvent.click(button);

  expect(error.textContent).toBe("");
});
