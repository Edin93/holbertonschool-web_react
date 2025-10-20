import { render, fireEvent, screen } from '@testing-library/react';
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

test('it should display an alert window whenever the user hit "ctrl" + "h" keyboard keys', () => {
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
