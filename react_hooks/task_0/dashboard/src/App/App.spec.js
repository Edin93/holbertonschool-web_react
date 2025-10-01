import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from './App';
import Header from "../Header/Header";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import Notifications from "../Notifications/Notifications";

test('renders App component without crashing', () => {
  render(<App />);
});

test('renders Header component without crashing', () => {
  render(<Header />);
});

test('renders Login component without crashing', () => {
  render(<Login />);
});

test('renders Footer component without crashing', () => {
  render(<Footer />);
});

test('renders Notifications component without crashing', () => {
  render(<Notifications />);
});

test('renders 2 input elements and a button with the text "OK" when isLoggedIn is false', () => {
  render(<App />);

  const emailInput = screen.getByLabelText(/email/i);
  expect(emailInput).toBeInTheDocument();

  const passwordInput = screen.getByLabelText(/password/i);
  expect(passwordInput).toBeInTheDocument();

  const buttonElement = screen.getByRole('button', { name: 'OK' });
  expect(buttonElement).toBeInTheDocument();
});


test('displays the title "Course list" above the CourseList component when isLoggedIn is true', () => {
  render(<App />);

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);

  fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password' } });

  const loginButton = screen.getByRole('button', { name: /OK/i });
  fireEvent.click(loginButton);

  const courseListTitle = screen.getByText(/Course list/i);
  expect(courseListTitle).toBeInTheDocument();
});

test('displays the title "Log in to continue" above the Login component when isLoggedIn is false', () => {
  render(<App />);

  const loginTitle = screen.getByText('Log in to continue');
  expect(loginTitle).toBeInTheDocument();
});

test('displays "News from the School" and "Holberton School News goes here" by default', () => {
  render(<App />);

  const newsTitle = screen.getByText('News from the School');
  expect(newsTitle).toBeInTheDocument();

  const newsContent = screen.getByText('Holberton School News goes here');
  expect(newsContent).toBeInTheDocument();
});

test('verifies that notification items are removed and the correct log is printed when clicked', () => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
  render(<App />);

  const notificationItem = screen.getByText('New course available');

  fireEvent.click(notificationItem);

  expect(console.log).toHaveBeenCalledWith('Notification 1 has been marked as read');
  const notificationList = screen.queryByText('New course available');
  expect(notificationList).toBeNull(); 
});
