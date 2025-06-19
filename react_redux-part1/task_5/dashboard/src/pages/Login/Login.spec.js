import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Login from './Login';

test('Testing signin form elements', () => {
    render(<Login />);
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: 'OK' });
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(screen.getByLabelText(/email/i)).toBe(emailInput);
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute('type', 'password');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
});

test('Should check that the email input element will be focused whenever the associated label is clicked', async () => {
    render(<Login />)
    const emailInput = screen.getByLabelText('Email');
    const emailLabel = screen.getByText('Email');
    userEvent.click(emailLabel);
    await waitFor(() => {
        expect(emailInput).toHaveFocus();
    });
})

test('Should check that the password input element will be focused whenver the associated label is clicked', async () => {
    render(<Login />)
    const passwordLabel = screen.getByText('Password');
    const passwordInput = screen.getByLabelText('Password');
    userEvent.click(passwordLabel);
    await waitFor(() => {
        expect(passwordInput).toHaveFocus();
    });
});

test('Submit button is disabled by default', () => {
    render(<Login isLoggedIn={false} />);
    const submitButton = screen.getByText('OK');
    expect(submitButton).toBeDisabled();
});

test('Submit button is enabled only with a valid email and password of at least 8 characters', () => {
    render(<Login isLoggedIn={false} />);
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByText('OK');
    expect(submitButton).toBeDisabled();
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: '123' } });
    expect(submitButton).toBeDisabled();
    fireEvent.change(emailInput, { target: { value: 'test.com' } });
    fireEvent.change(passwordInput, { target: { value: '12345678' } });
    expect(submitButton).toBeDisabled();
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: '12345678' } });
    expect(submitButton).not.toBeDisabled();
});

describe('Login Component Tests', () => {
    test('Should initialize with default email and password', () => {
        render(<Login />);
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        expect(emailInput.value).toBe('');
        expect(passwordInput.value).toBe('');
    });

    test('Should call logIn function on form submission', () => {
        const mockLogin = jest.fn();
        render(<Login login={mockLogin} />);
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        const form = screen.getByRole('form');
        fireEvent.submit(form);
        expect(mockLogin).toHaveBeenCalledWith('test@test.com', 'password123');
    });

    test('Should enable the submit button only with valid email and password', () => {
        render(<Login />);
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const submitButton = screen.getByRole('button', { name: /ok/i });
        expect(submitButton).toBeDisabled();
        fireEvent.change(emailInput, { target: { value: 'valid@test.com' } });
        fireEvent.change(passwordInput, { target: { value: 'validpassword' } });
        expect(submitButton).not.toBeDisabled();
    });

    test('Should update state on email and password input change', () => {
        render(<Login />);
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        fireEvent.change(emailInput, { target: { value: 'newemail@test.com' } });
        fireEvent.change(passwordInput, { target: { value: 'newpassword' } });
        expect(emailInput.value).toBe('newemail@test.com');
        expect(passwordInput.value).toBe('newpassword');
    });
});
