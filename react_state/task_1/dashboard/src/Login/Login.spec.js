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

describe('Password Validation Tests', () => {
  test('submit button remains disabled when password is less than 8 characters', async () => {
    const user = userEvent.setup();
    render(<Login />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'OK' });

    await user.type(emailInput, 'test@example.com');

    const shortPasswords = [
      '',
      '1',
      'ab',
      'abc',
      'pass',
      'pass1',
      'pass12',
      'pass123',
    ];

    for (const shortPassword of shortPasswords) {
      await user.clear(passwordInput);
      if (shortPassword) {
        await user.type(passwordInput, shortPassword);
      }

      await waitFor(() => {
        expect(submitButton).toBeDisabled();
      });
    }
  });

  test('submit button is enabled when password is exactly 8 characters or more', async () => {
    const user = userEvent.setup();
    render(<Login />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'OK' });

    await user.type(emailInput, 'test@example.com');

    const validPasswords = [
      'pass1234',
      'password',
      'password123',
      'VeryLongPassword123!',
      '12345678',
      'P@ssw0rd',
    ];

    for (const validPassword of validPasswords) {
      await user.clear(passwordInput);
      await user.type(passwordInput, validPassword);

      await waitFor(() => {
        expect(submitButton).toBeEnabled();
      });
    }
  });

  test('submit button state changes from enabled to disabled when password becomes too short', async () => {
    const user = userEvent.setup();
    render(<Login />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'OK' });

    await user.type(emailInput, 'valid@email.com');
    await user.type(passwordInput, 'validpassword');

    await waitFor(() => {
      expect(submitButton).toBeEnabled();
    });

    await user.clear(passwordInput);
    await user.type(passwordInput, 'short');

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });

  test('submit button remains disabled when password is 8 chars but email is invalid', async () => {
    const user = userEvent.setup();
    render(<Login />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'OK' });

    await user.type(emailInput, 'invalid-email');
    await user.type(passwordInput, 'password123');

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });
});
