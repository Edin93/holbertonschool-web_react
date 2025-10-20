import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { getCurrentYear, getFooterCopy } from '../utils/utils';

test('It should render footer with copyright text', () => {
  const defaultUser = {
    email: '',
    password: '',
    isLoggedIn: false
  };

  render(<Footer user={defaultUser} />)

  const footerParagraph = screen.getByText(/copyright/i);

  expect(footerParagraph).toHaveTextContent(new RegExp(`copyright ${(new Date()).getFullYear()}`, 'i'))
  expect(footerParagraph).toHaveTextContent(/holberton school/i)
});

test('Contact us link is not displayed when user is logged out', () => {
  const loggedOutUser = {
    email: '',
    password: '',
    isLoggedIn: false
  };

  render(<Footer user={loggedOutUser} />);

  const contactLink = screen.queryByText(/contact us/i);
  expect(contactLink).not.toBeInTheDocument();
});

test('Contact us link is displayed when user is logged in', () => {
  const loggedInUser = {
    email: 'test@test.com',
    password: 'password123',
    isLoggedIn: true
  };

  render(<Footer user={loggedInUser} />);

  const contactLink = screen.getByText(/contact us/i);
  expect(contactLink).toBeInTheDocument();
});
