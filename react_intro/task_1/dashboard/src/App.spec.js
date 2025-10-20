import { render, screen } from '@testing-library/react';
import App from './App.jsx';

test('should contain a <p/> element with specific text, <h1/>, and an <img/>', () => {
  render(<App />);

  const paragraphElement = screen.getByText('Login to access the full dashboard');
  const footerParagraphElement = screen.getByText(/copyright/i);
  const headingElement = screen.getByRole('heading', { name: /school dashboard/i });
  const imgElement = screen.getByRole('img');

  expect(paragraphElement).toBeInTheDocument();
  expect(footerParagraphElement).toBeInTheDocument();
  expect(headingElement).toBeInTheDocument();
  expect(imgElement).toBeInTheDocument();
});
