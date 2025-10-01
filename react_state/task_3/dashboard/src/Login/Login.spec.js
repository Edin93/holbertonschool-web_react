import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import Login from "./Login";

const logInMock = jest.fn();

describe('Login Component', () => {
    test('Renders App body text', () => {
        render(<Login />);
        const bodyElement = screen.getByText(/Login to access the full dashboard/i);
        expect(bodyElement.closest('.App-body')).toBeInTheDocument();
    });

    test('Renders 2 input elements', () => {
        render(<Login />);
        const inputElements = screen.getAllByRole('textbox');
        const passwordInputs = screen.getAllByRole('textbox', { hidden: true });
        expect(inputElements.length + passwordInputs.length).toBe(2);
    });

    test('Renders 2 label elements with text Email and Password', () => {
        render(<Login />);
        const emailInput = screen.getByText(/email/i);
        const passwordInput = screen.getByText(/password/i);
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
    });

    test('Renders a button with the text OK', () => {
        render(<Login />);
        const buttonElement = screen.getByRole('button', { name: /ok/i });
        expect(buttonElement).toBeInTheDocument();
    });

    test('Focuses the email input when the email label is clicked', async () => {
        render(<Login />)
        const emailInput = screen.getByLabelText('Email');
        const emailLabel = screen.getByText('Email');
        userEvent.click(emailLabel);
        await waitFor(() => {
            expect(emailInput).toHaveFocus();
        });
    });

    test('Submit button is disabled by default', () => {
        render(<Login />);
        const submitButton = screen.getByRole('button', { name: /ok/i });
        expect(submitButton).toBeDisabled();
    });

    test('Submit button is enabled only after valid input', () => {
        render(<Login />);
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const submitButton = screen.getByRole('button', { name: /ok/i });
        expect(submitButton).toBeDisabled();
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        expect(submitButton).toBeEnabled();
        fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
        fireEvent.change(passwordInput, { target: { value: 'short' } });
        expect(submitButton).toBeDisabled();
    });

    test('Calls logIn method with the correct email and password when form is submitted', () => {
        render(<Login logIn={logInMock} />);
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        const submitButton = screen.getByRole('button', { name: /ok/i });
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.submit(submitButton);
        expect(logInMock).toHaveBeenCalledWith('test@example.com', 'password123');
    });
});
