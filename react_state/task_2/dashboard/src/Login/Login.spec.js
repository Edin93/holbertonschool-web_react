import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login";

describe("Login Component with Context", () => {
    const logInMock = jest.fn();
    test("Calls logIn prop with email and password on form submission", () => {
        render(<Login logIn={logInMock} email="" password="" />);
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const submitButton = screen.getByRole("button", { name: /ok/i });
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });
        fireEvent.click(submitButton);
        expect(logInMock).toHaveBeenCalledWith("test@example.com", "password123");
    });
});
