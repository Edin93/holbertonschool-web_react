import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { getCurrentYear, getFooterCopy } from '../utils/utils';

test('It should render footer with copyright text', () => {
  render(<Footer />)

  const footerParagraph = screen.getByText(/copyright/i);

  expect(footerParagraph).toHaveTextContent(new RegExp(`copyright ${(new Date()).getFullYear()}`, 'i'))
  expect(footerParagraph).toHaveTextContent(/holberton school/i)
});
