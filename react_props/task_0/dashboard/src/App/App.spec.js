import { render, screen } from "@testing-library/react";
import { expect, test } from "@jest/globals";
import App from "./App";

test("Should render the header, login, and footer components", () => {
  render(<App />);
  expect(screen.getByText(/School dashboard/i)).toBeInTheDocument();
  expect(screen.getByText(/Login to access the full dashboard/i)).toBeInTheDocument();
  expect(screen.getByText(/Copyright 2025 - Holberton School/i)).toBeInTheDocument();
});
