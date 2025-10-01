import { getFooterCopy } from '../utils/utils';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer/Footer';

describe('Footer Component', () => {

  test('renders correct copyright string when getFooterCopy returns true', () => {
    expect(getFooterCopy(true)).toBe('Holberton School');
  });

  test('does not display "Contact us" link when the user is logged out', () => {
    const user = {
      isLoggedIn: false,
    };

    render(<Footer user={user} />);

    const contactLink = screen.queryByText('Contact us');
    expect(contactLink).toBeNull();
  });

  test('displays "Contact us" link when the user is logged in', () => {
    const user = {
      isLoggedIn: true,
    };

    render(<Footer user={user} />);

    const contactLink = screen.getByText('Contact us');
    expect(contactLink).toBeInTheDocument();
  });

});
