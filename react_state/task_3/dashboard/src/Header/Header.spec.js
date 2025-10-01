import React from "react";
import { render, screen, fireEvent } from "@testing-library/react"
import Header from "./Header";
import { newContext } from '../Context/context';

describe('Header Component', () => {
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

    test('Does not display the logoutSection when user is not logged in', () => {
        render(
            <newContext.Provider value={{ user: { isLoggedIn: false, email: '' }, logOut: jest.fn() }}>
                <Header />
            </newContext.Provider>
        );
        expect(screen.queryByText(/Welcome/)).not.toBeInTheDocument();
    });

    test('Displays the logoutSection when user is logged in', () => {
        render(
            <newContext.Provider value={{ user: { isLoggedIn: true, email: 'test@example.com' }, logOut: jest.fn() }}>
                <Header />
            </newContext.Provider>
        );
        expect(screen.getByText(/Welcome test@example.com/)).toBeInTheDocument();
    });

    test('Calls logOut when clicking the logout link', () => {
        const mockLogOut = jest.fn();
        render(
            <newContext.Provider value={{ user: { isLoggedIn: true, email: 'test@example.com' }, logOut: mockLogOut }}>
                <Header />
            </newContext.Provider>
        );
        fireEvent.click(screen.getByText(/logout/));
        expect(mockLogOut).toHaveBeenCalled();
    });
})
