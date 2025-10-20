import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('The App component renders without crashing', () => {
  render(<App />);
});

test('The App component renders Login when user is not logged in (default state)', () => {
  render(<App />);

  const emailLabelElement = screen.getByLabelText(/email/i);
  const passwordLabelElement = screen.getByLabelText(/password/i);
  const buttonElements = screen.getAllByRole('button', { name: /ok/i })

  expect(emailLabelElement).toBeInTheDocument()
  expect(passwordLabelElement).toBeInTheDocument()
  expect(buttonElements.length).toBeGreaterThanOrEqual(1)
});

test('CourseList is not displayed when user is not logged in', () => {
  render(<App />);

  const tableElement = screen.queryByRole('table');

  expect(tableElement).not.toBeInTheDocument();
});

test('when user logs in, CourseList is displayed and Login is not displayed', async () => {
  const user = userEvent.setup();
  render(<App />);

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /ok/i });

  await user.type(emailInput, 'test@example.com');
  await user.type(passwordInput, 'password123');

  await waitFor(() => {
    expect(submitButton).toBeEnabled();
  });

  await user.click(submitButton);

  await waitFor(() => {
    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();
  });

  const loginForm = screen.queryByLabelText(/email/i);
  expect(loginForm).not.toBeInTheDocument();
});

test('it should display an alert and log out when ctrl+h is pressed', () => {
  const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

  render(<App />);

  fireEvent.keyDown(document, { ctrlKey: true, key: 'h' });

  expect(alertSpy).toHaveBeenCalledWith('Logging you out');

  alertSpy.mockRestore();
});

test('it should display "News from the School" title and paragraph by default', () => {
  render(<App />);

  const newsTitle = screen.getByRole('heading', { name: /news from the school/i });
  const newsParagraph = screen.getByText(/holberton school news goes here/i);

  expect(newsTitle).toBeInTheDocument();
  expect(newsParagraph).toBeInTheDocument();
});

test('clicking on a notification item removes it from the list and logs to console', async () => {
  const user = userEvent.setup();
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

  render(<App />);

  const notificationItems = screen.getAllByRole('listitem');
  const initialCount = notificationItems.length;

  await user.click(notificationItems[0]);

  expect(consoleSpy).toHaveBeenCalledWith('Notification 1 has been marked as read');

  await waitFor(() => {
    const updatedItems = screen.queryAllByRole('listitem');
    expect(updatedItems.length).toBe(initialCount - 1);
  });

  consoleSpy.mockRestore();
});
