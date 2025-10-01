import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";

describe('Header Component', () => {
  test('renders School Dashboard heading', () => {
    render(<Header user={{ isLoggedIn: false, email: '' }} logOut={jest.fn()} />);
    const headingElement = screen.getByRole('heading', { name: /School dashboard/i });
    expect(headingElement).toBeInTheDocument();
  });

  test('renders App img', () => {
    render(<Header user={{ isLoggedIn: false, email: '' }} logOut={jest.fn()} />);
    const imgElement = screen.getByRole('img', { name: /holberton logo/i });
    expect(imgElement).toBeInTheDocument();
  });

  test('does not display the logoutSection when user is not logged in', () => {
    render(<Header user={{ isLoggedIn: false, email: '' }} logOut={jest.fn()} />);
    expect(screen.queryByText(/Welcome/i)).not.toBeInTheDocument();
  });

  test('displays the logoutSection when user is logged in', () => {
    render(<Header user={{ isLoggedIn: true, email: 'test@example.com' }} logOut={jest.fn()} />);
    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
  });

  test('calls logOut when clicking the logout link', () => {
    const mockLogOut = jest.fn();
    render(<Header user={{ isLoggedIn: true, email: 'test@example.com' }} logOut={mockLogOut} />);
    fireEvent.click(screen.getByText(/logout/));
    expect(mockLogOut).toHaveBeenCalled();
  });
});
