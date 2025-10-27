import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Login from './Login';

test('testing signin form elements', () => {
  render(<Login />);

  const emailLabelElement = screen.getByLabelText(/email/i);
  const passwordLabelElement = screen.getByLabelText(/password/i);
  const buttonElementText = screen.getByRole('button', { name: /OK/i });
  const inputElements = screen.getAllByLabelText(/email|password/i);

  expect(inputElements).toHaveLength(2);
  expect(emailLabelElement).toBeInTheDocument();
  expect(passwordLabelElement).toBeInTheDocument();
  expect(buttonElementText).toBeInTheDocument();
});

test('it should check that the email input element will be focused whenever the associated label is clicked', async () => {
  render(<Login />)

  const emailInput = screen.getByLabelText(/Email/i);
  const emailLabel = screen.getByText(/Email/i);

  userEvent.click(emailLabel);

  await waitFor(() => {
    expect(emailInput).toHaveFocus();
  });
})

test('it should check that the password input element will be focused whenver the associated label is clicked', async () => {
  render(<Login />)

  const passwordLabel = screen.getByText(/Password/i);
  const passwordInput = screen.getByLabelText(/Password/i);

  userEvent.click(passwordLabel);

  await waitFor(() => {
    expect(passwordInput).toHaveFocus();
  });
});
