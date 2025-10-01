import { render, screen } from '@testing-library/react';
import { test, expect } from "@jest/globals";
import App from './App'

test('The App component render successfully', () => {
  render(<App />);
});

test('The App component render successfully', () => {
  const props = {
    isLoggedIn: true
  }

  render(<App {...props} />);
  const tableElement = screen.getByRole('table');
  expect(tableElement).toBeInTheDocument()
});

test('The App component render successfully', () => {
  const props = {
    isLoggedIn: false
  }

  render(<App {...props} />);

  const inputElements = screen.getAllByRole('textbox')
  const emailLabelElement = screen.getByLabelText(/email/i);
  const passwordLabelElement = screen.getByLabelText(/password/i);
  const buttonElementText = screen.getByRole('button', { name: /ok/i })

  expect(inputElements).toHaveLength(2)
  expect(emailLabelElement).toBeInTheDocument()
  expect(passwordLabelElement).toBeInTheDocument()
  expect(buttonElementText).toBeInTheDocument()
});
