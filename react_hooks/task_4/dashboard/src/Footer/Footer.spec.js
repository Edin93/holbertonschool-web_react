import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import newContext from '../Context/context';

test('It should render footer with copyright text', () => {
  render(<Footer />)

  const footerParagraph = screen.getByText(/copyright/i);

  expect(footerParagraph).toHaveTextContent(new RegExp(`copyright ${(new Date()).getFullYear()}`, 'i'))
  expect(footerParagraph).toHaveTextContent(/holberton school/i)
});

test('Contact us link is not displayed when user is logged out', () => {
  const contextValue = {
    user: {
      email: '',
      password: '',
      isLoggedIn: false
    },
    logOut: jest.fn()
  };

  render(
    <newContext.Provider value={contextValue}>
      <Footer />
    </newContext.Provider>
  );

  const contactLink = screen.queryByText(/contact us/i);
  expect(contactLink).not.toBeInTheDocument();
});

test('Contact us link is displayed when user is logged in', () => {
  const contextValue = {
    user: {
      email: 'test@test.com',
      password: 'password123',
      isLoggedIn: true
    },
    logOut: jest.fn()
  };

  render(
    <newContext.Provider value={contextValue}>
      <Footer />
    </newContext.Provider>
  );

  const contactLink = screen.getByText(/contact us/i);
  expect(contactLink).toBeInTheDocument();
});
