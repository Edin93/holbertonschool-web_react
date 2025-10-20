import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';

test('The App component renders without crashing', () => {
  render(<App />);
});

test('The App component renders Login by default (user not logged in)', () => {
  render(<App />);

  const emailLabelElement = screen.getByLabelText(/email/i);
  const passwordLabelElement = screen.getByLabelText(/password/i);
  const buttonElements = screen.getAllByRole('button', { name: /ok/i })

  expect(emailLabelElement).toBeInTheDocument()
  expect(passwordLabelElement).toBeInTheDocument()
  expect(buttonElements.length).toBeGreaterThanOrEqual(1)
});

test('it should call the logOut prop once whenever the user hits "Ctrl" + "h" keyboard keys', () => {
  const logOutMock = jest.fn();
  const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

  render(<App logOut={logOutMock} />);

  fireEvent.keyDown(document, { ctrlKey: true, key: 'h' });

  expect(logOutMock).toHaveBeenCalledTimes(1);

  alertSpy.mockRestore();
});

test('it should display an alert window whenever the user hit "ctrl" + "h" keyboard keys', () => {
  const logoutSpy = jest.fn();
  const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

  render(<App logOut={logoutSpy} />);

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

test('clicking on a notification item removes it from the list and logs the message', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

  const { container } = render(<App />);

  const notificationItems = container.querySelectorAll('[data-notification-type]');
  const initialCount = notificationItems.length;

  if (notificationItems.length > 0) {
    fireEvent.click(notificationItems[0]);

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringMatching(/Notification \d+ has been marked as read/));

    const updatedNotificationItems = container.querySelectorAll('[data-notification-type]');
    expect(updatedNotificationItems.length).toBe(initialCount - 1);
  }

  consoleSpy.mockRestore();
});
