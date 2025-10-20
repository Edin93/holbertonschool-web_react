import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';
import newContext from '../Context/context';

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
  render(<Header />);

  const headingElement = screen.getByRole('heading', {name: /school Dashboard/i});
  const imgElement = screen.getByAltText('holberton logo')

  expect(headingElement).toBeInTheDocument();
  expect(headingElement).toHaveStyle({color: convertHexToRGBA('#e1003c') })
  expect(imgElement).toBeInTheDocument();
});

test('logoutSection is not rendered when using default context value', () => {
  render(<Header />);

  const logoutSection = screen.queryByText(/(logout)/i);

  expect(logoutSection).not.toBeInTheDocument();
});

test('logoutSection is rendered when user is logged in', () => {
  const contextValue = {
    user: {
      email: 'test@example.com',
      password: 'password123',
      isLoggedIn: true
    },
    logOut: jest.fn()
  };

  render(
    <newContext.Provider value={contextValue}>
      <Header />
    </newContext.Provider>
  );

  const logoutSection = screen.getByText(/welcome test@example.com/i);

  expect(logoutSection).toBeInTheDocument();
});

test('clicking logout link calls the logOut function', async () => {
  const user = userEvent.setup();
  const mockLogOut = jest.fn();

  const contextValue = {
    user: {
      email: 'test@example.com',
      password: 'password123',
      isLoggedIn: true
    },
    logOut: mockLogOut
  };

  render(
    <newContext.Provider value={contextValue}>
      <Header />
    </newContext.Provider>
  );

  const logoutLink = screen.getByText(/(logout)/i);

  await user.click(logoutLink);

  expect(mockLogOut).toHaveBeenCalledTimes(1);
});
