import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';

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

test('it should call the logOut prop once whenever the user hits "Ctrl" + "h" keyboard keys', () => {
  const logOutMock = jest.fn();
  const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

  render(<App isLoggedIn={true} logOut={logOutMock} />);

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
