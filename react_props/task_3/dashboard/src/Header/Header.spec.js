import { render, screen } from "@testing-library/react";
import { expect, test } from "@jest/globals";
import Header from "./Header";

test("Should display the Holberton logo", () => {
    render(<Header />);
    const imgHeader = screen.getByAltText(/holberton logo/i);
    expect(imgHeader).toBeInTheDocument();
});

test("Should display the heading with the correct text", () => {
    render(<Header />);
    const heading = screen.getByRole("heading", { level: 1, name: /School dashboard/i });
    expect(heading).toBeInTheDocument();
});
