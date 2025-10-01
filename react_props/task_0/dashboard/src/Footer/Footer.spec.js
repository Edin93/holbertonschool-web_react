import { render, screen } from "@testing-library/react";
import { expect, test } from "@jest/globals";
import Footer from "./Footer";

test("Should render the footer text", () => {
    render(<Footer />);
    const footerText = screen.getByText(/Copyright 2025 - Holberton School/i);
    expect(footerText).toBeInTheDocument();
});
