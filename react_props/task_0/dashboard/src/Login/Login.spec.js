import { render, screen } from "@testing-library/react";
import { expect, test } from "@jest/globals";
import Login from "./Login";

test("Should render 2 input elements", () => {
    render(<Login />);
    const emailInput = screen.getByRole("textbox");
    const passwordInput = screen.getByLabelText(/Password/i);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
});

test("Should render 2 label elements with the text 'Email' and 'Password'", () => {
    render(<Login />);
    const labelEmail = screen.getByText(/email/i);
    const labelPassword = screen.getByText(/password/i);
    expect(labelEmail).toBeInTheDocument();
    expect(labelPassword).toBeInTheDocument();
});

test("Should render a button with the text 'OK'", () => {
    render(<Login />);
    const button = screen.getByRole("button", { name: /ok/i });
    expect(button).toBeInTheDocument();
});
