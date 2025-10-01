import React from "react";
import { render, screen } from "@testing-library/react"
import Header from "./Header";

test('Renders School Dashboard heading', () => {
    render(<Header />);
    const headingElement = screen.getByRole('heading', { name: /School dashboard/i });
    expect(headingElement).toBeInTheDocument();
});

test('Renders App img', () => {
    render(<Header />);
    const imgElement = screen.getByRole('img', { name: /holberton logo/i });
    expect(imgElement).toBeInTheDocument();
});
