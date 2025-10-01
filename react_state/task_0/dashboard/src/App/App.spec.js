import React from "react";
import { render, screen, fireEvent } from "@testing-library/react"
import App from './App'
import Header from "../Header/Header";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import Notifications from "../Notifications/Notifications";

test('Renders App component without craching', () => {
  render(<App />);
});

test('Renders Header component without craching', () => {
  render(<Header />);
});

test('Renders Login component without craching', () => {
  render(<Login />);

});

test('Renders Footer component without craching', () => {
  render(<Footer />);
});

test('Renders Notifications component without craching', () => {
  render(<Notifications />);

});

test('Renders 2 input elements and a button with the text "OK" when isLoggedIn is false', () => {
  render(<App isLoggedIn={false} />);
  const emailInput = screen.getAllByRole('textbox', { name: /email/i });
  expect(emailInput.length).toBe(1);
  const passwordInput = screen.getByText(/password/i);
  expect(passwordInput).toBeInTheDocument();
  const buttonElement = screen.getByRole('button', { name: 'OK' });
  expect(buttonElement).toBeInTheDocument();
});

test('Renders a table element when isLoggedIn is true', () => {
  render(<App isLoggedIn={true} />);
  const tableElement = screen.getByRole('table');
  expect(tableElement).toBeInTheDocument();
});

window.alert = jest.fn();

test('Calls logOut when Ctrl + H is pressed', () => {
  const logOutMock = jest.fn();
  const { container } = render(<App isLoggedIn={true} logOut={logOutMock} />);
  fireEvent.keyDown(container, { key: 'h', ctrlKey: true });
  expect(logOutMock).toHaveBeenCalledTimes(1);
});

test('Calls alert with "Logging you out" when Ctrl + H is pressed', () => {
  render(<App isLoggedIn={true} />);
  fireEvent.keyDown(document, { key: 'h', ctrlKey: true });
  expect(global.alert).toHaveBeenCalledWith('Logging you out');
});

test('Displays the title "Course list" above the CourseList component when isLoggedIn is true', () => {
  render(<App isLoggedIn={true} />);
  const courseListTitle = screen.getByText("Course list");
  expect(courseListTitle).toBeInTheDocument();
});

test('Displays the title "Log in to continue" above the Login component when isLoggedIn is false', () => {
  render(<App isLoggedIn={false} />);
  const loginTitle = screen.getByText('Log in to continue');
  expect(loginTitle).toBeInTheDocument();
});

test('Displays "News from the School" and "Holberton School News goes here" by default', () => {
  render(<App />);
  const newsTitle = screen.getByText('News from the School');
  expect(newsTitle).toBeInTheDocument();
  const newsContent = screen.getByText('Holberton School News goes here');
  expect(newsContent).toBeInTheDocument();
});
