import { fireEvent, render, screen } from '@testing-library/react';
import Login from './Login';


test('testing signin form elements', () => {
    render(<Login />);
    const inputElements = screen.getAllByRole('textbox')
    const emailLabelElement = screen.getByLabelText(/email/i);
    const passwordLabelElement = screen.getByLabelText(/password/i);
    const buttonElementText = screen.getByRole('button', { name: 'OK' })
    expect(inputElements).toHaveLength(2)
    expect(emailLabelElement).toBeInTheDocument()
    expect(passwordLabelElement).toBeInTheDocument()
    expect(buttonElementText).toBeInTheDocument()
});

test('should check that the email input element will be focused whenever the associated label is clicked', async () => {
    render(<Login />)
    const emailLabel = screen.getByText('Email');
    const emailInput = screen.getByLabelText('Email', { selector: 'input' });
    fireEvent.click(emailLabel);
    emailInput.focus();
    expect(emailInput).toHaveFocus();
})

test('should check that the password input element will be focused whenver the associated label is clicked', async () => {
    render(<Login />)
    const passwordLabel = screen.getByText('Password');
    const passwordInput = screen.getByLabelText('Password', { selector: 'input' });
    fireEvent.click(passwordLabel);
    passwordInput.focus()
    expect(passwordInput).toHaveFocus();
});
