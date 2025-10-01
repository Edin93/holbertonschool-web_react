import { render, screen } from "@testing-library/react";
import { expect, test } from "@jest/globals";
import Header from "./Header";

test("Should display the correct header title", () => {
    render(<Header />);
    const header = screen.getByText(/School dashboard/i);
    expect(header).toBeInTheDocument();
});

test("Should check that the header image is present", () => {
    render(<Header />);
    const imgHeader = screen.getByAltText(/holberton logo/i);
    expect(imgHeader).toBeInTheDocument();
});
