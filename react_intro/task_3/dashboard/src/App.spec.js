import { render, screen } from "@testing-library/react";
import { expect, test } from '@jest/globals';
import App from "./App";

test('Should return the good title', () => {
  render(<App />)
  const header = screen.getByText(/School dashboard/i);
  expect(header).toBeInTheDocument();
})

test('Should return 2 correct texts', () => {
  render(<App />)
  const p1 = screen.getByText(/Login to access the full dashboard/i);
  const p2 = screen.getByText(/Copyright 2024 Holberton School/i);
  expect(p1).toBeInTheDocument();
  expect(p2).toBeInTheDocument();
})

test('Should check that the header image is present', () => {
  render(<App />)
  const imgHeader = screen.getByAltText(/holberton logo/i);
  expect(imgHeader).toBeInTheDocument();
})

test("Should render 2 input elements", () => {
  render(<App />)
  const emailInput = screen.getByRole('textbox');
  const passwordInput = screen.getByLabelText(/Password/i);
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
});

test("Should render 2 label elements with the text 'Email' and 'Password'", () => {
  render(<App />);
  const labelEmail = screen.getByText(/email/i);
  const labelPassword = screen.getByText(/password/i);
  expect(labelEmail).toBeInTheDocument();
  expect(labelPassword).toBeInTheDocument();
});

test("Should render a button with the text 'OK'", () => {
  render(<App />)
  const button = screen.getByRole('button', { name: /ok/i });
  expect(button).toBeInTheDocument();
});
