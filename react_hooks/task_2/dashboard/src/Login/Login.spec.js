import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Login from './Login';

test('testing signin form elements', () => {
  render(<Login />);

  const inputElements = screen.getAllByLabelText(/email|password/i);
  const emailLabelElement = screen.getByLabelText(/email/i);
  const passwordLabelElement = screen.getByLabelText(/password/i);
  const buttonElementText = screen.getByRole('button', { name: 'OK' })

  expect(inputElements).toHaveLength(2)
  expect(emailLabelElement).toBeInTheDocument()
  expect(passwordLabelElement).toBeInTheDocument()
  expect(buttonElementText).toBeInTheDocument()
});

test('it should check that the email input element will be focused whenever the associated label is clicked', async () => {
  render(<Login />)

  const emailInput = screen.getByLabelText('Email');
  const emailLabel = screen.getByText('Email');

  userEvent.click(emailLabel);

  await waitFor(() => {
    expect(emailInput).toHaveFocus();
  });
})

test('it should check that the password input element will be focused whenver the associated label is clicked', async () => {
  render(<Login />)

  const passwordLabel = screen.getByText('Password');
  const passwordInput = screen.getByLabelText('Password');

  userEvent.click(passwordLabel);

  await waitFor(() => {
    expect(passwordInput).toHaveFocus();
  });
});

test('submit button is disabled by default', () => {
  render(<Login />);

  const submitButton = screen.getByRole('button', { name: 'OK' });

  expect(submitButton).toBeDisabled();
});

test('submit button is enabled after entering valid email and password', async () => {
  const user = userEvent.setup();
  render(<Login />);

  const emailInput = screen.getByLabelText('Email');
  const passwordInput = screen.getByLabelText('Password');
  const submitButton = screen.getByRole('button', { name: 'OK' });

  expect(submitButton).toBeDisabled();

  await user.type(emailInput, 'test@example.com');

  expect(submitButton).toBeDisabled();

  await user.type(passwordInput, 'password123');

  await waitFor(() => {
    expect(submitButton).toBeEnabled();
  });
});

test('logIn method is called with email and password when form is submitted', async () => {
  const user = userEvent.setup();
  const mockLogIn = jest.fn();

  render(<Login logIn={mockLogIn} />);

  const emailInput = screen.getByLabelText('Email');
  const passwordInput = screen.getByLabelText('Password');
  const submitButton = screen.getByRole('button', { name: 'OK' });

  await user.type(emailInput, 'test@example.com');
  await user.type(passwordInput, 'password123');

  await waitFor(() => {
    expect(submitButton).toBeEnabled();
  });

  await user.click(submitButton);

  expect(mockLogIn).toHaveBeenCalledTimes(1);
  expect(mockLogIn).toHaveBeenCalledWith('test@example.com', 'password123');
});
