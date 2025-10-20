import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { getCurrentYear, getFooterCopy } from '../utils/utils';

test('it should rendered without crashing', () => {
  render(<Footer />)

  const footerParagraph = screen.getByText(`Copyright ${getCurrentYear()} - ${getFooterCopy(true)}`);

  expect(footerParagraph).toHaveTextContent(/copyright 2025 - holberton School/i)
})
