import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App Component with Context", () => {
  test("Displays CourseList when logged in and Login when not logged in", () => {
    render(<App />);
    expect(screen.getByText("Log in to continue")).toBeInTheDocument();
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /ok/i });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);
    expect(screen.getByText("Course list")).toBeInTheDocument();
  });

  test("Handles Ctrl+H logout correctly", () => {
    const { container } = render(<App />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /ok/i });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);
    fireEvent.keyDown(container, { key: "h", ctrlKey: true });
    expect(screen.getByText("Log in to continue")).toBeInTheDocument();
  });
});
