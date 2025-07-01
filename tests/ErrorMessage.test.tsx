import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import ErrorMessage from "../src/components/ErrorMessage";
import React from "react";

describe("ErrorMessage", () => {
  it("shows error when present", () => {
    render(<ErrorMessage name="email" errors={{ email: "Invalid email" }} />);
    expect(screen.getByText("Invalid email")).toBeInTheDocument();
  });

  it("renders nothing if no error", () => {
    const { container } = render(<ErrorMessage name="email" errors={{}} />);
    expect(container).toBeEmptyDOMElement();
  });
});
