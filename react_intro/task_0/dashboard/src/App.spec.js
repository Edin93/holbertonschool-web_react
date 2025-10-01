import { render, screen } from "@testing-library/react";
import App from "./App";

test('Should return a good title text : School dashboard', () => {
    render(<App />)
    const header = screen.getByText(/School dashboard/i);
    expect(header).toBeInTheDocument();
})

test('Should return 2 good text', () => {
    render(<App />)
    const p1 = screen.getByText(/Login to access the full dashboard/i);
    const p2 = screen.getByText(/Copyright 2024 - holberton School/i);
    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
})

test('Should check header image is présent', () => {
    render(<App />)
    const imgHeader = screen.getByAltText(/holberton logo/i);
    expect(imgHeader).toBeInTheDocument();
})
