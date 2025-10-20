import { render, screen } from '@testing-library/react';
import App from './App'

test('The App component renders without crashing', () => {
  render(<App />);
});

test('The App component renders CourseList when isLoggedIn is true', () => {
  const props = {
    isLoggedIn: true
  }

  render(<App {...props} />);

  const tableElement = screen.getByRole('table');

  expect(tableElement).toBeInTheDocument()
});

test('The App component renders Login when isLoggedIn is false', () => {
  const props = {
    isLoggedIn: false
  }

  render(<App {...props} />);

  const inputElements = screen.getAllByLabelText(/email|password/i);
  const emailLabelElement = screen.getByLabelText(/email/i);
  const passwordLabelElement = screen.getByLabelText(/password/i);
  const buttonElementText = screen.getByRole('button', { name: /ok/i })

  expect(inputElements).toHaveLength(2)
  expect(emailLabelElement).toBeInTheDocument()
  expect(passwordLabelElement).toBeInTheDocument()
  expect(buttonElementText).toBeInTheDocument()
});
