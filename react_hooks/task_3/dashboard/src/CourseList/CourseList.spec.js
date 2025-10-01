import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App/App';
import { newContext } from '../Context/context';

describe('CourseList Component', () => {
  test('renders 5 different rows when user is logged in', () => {
    render(<App />);
    const emailInput = screen.getByLabelText(/Email:/i);
    const passwordInput = screen.getByLabelText(/Password:/i);
    const loginButton = screen.getByRole('button', { name: /ok/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);
    
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(5);
  });
});
