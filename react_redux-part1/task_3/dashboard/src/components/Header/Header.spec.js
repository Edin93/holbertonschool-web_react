import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

export const convertHexToRGBA = (hexCode) => {
  let hex = hexCode.replace('#', '');

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
    console.log({hex})
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return { r, g, b };
};

test('should contain a <p/> element with specific text, <h1/>, and an <img/>', () => {
  const defaultUser = {
    email: '',
    password: '',
    isLoggedIn: false
  };

  render(<Header user={defaultUser} logOut={jest.fn()} />);

  const headingElement = screen.getByRole('heading', {name: /school Dashboard/i});
  const imgElement = screen.getByAltText('holberton logo')

  expect(headingElement).toBeInTheDocument();
  expect(headingElement).toHaveStyle({color: convertHexToRGBA('#e1003c') })
  expect(imgElement).toBeInTheDocument();
});

test('logoutSection is not rendered with default context value', () => {
  const defaultUser = {
    email: '',
    password: '',
    isLoggedIn: false
  };

  render(<Header user={defaultUser} logOut={jest.fn()} />);

  const logoutSection = screen.queryByText(/logout/i);

  expect(logoutSection).not.toBeInTheDocument();
});

test('logoutSection is rendered when user is logged in', () => {
  const loggedInUser = {
    email: 'test@test.com',
    password: 'password123',
    isLoggedIn: true
  };

  render(<Header user={loggedInUser} logOut={jest.fn()} />);

  const logoutSection = screen.getByText(/logout/i);
  expect(logoutSection).toBeInTheDocument();
  expect(screen.getByText(/test@test.com/i)).toBeInTheDocument();
});

test('clicking logout link calls the logOut function', () => {
  const logOutSpy = jest.fn();
  const loggedInUser = {
    email: 'test@test.com',
    password: 'password123',
    isLoggedIn: true
  };

  render(<Header user={loggedInUser} logOut={logOutSpy} />);

  const logoutLink = screen.getByText(/logout/i);
  fireEvent.click(logoutLink);

  expect(logOutSpy).toHaveBeenCalledTimes(1);
});
