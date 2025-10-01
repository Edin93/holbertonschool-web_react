import React from 'react';
import axios from 'axios';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App/App';


describe('CourseList Component', () => {
  jest.mock('axios');

  test('renders 5 different rows when user is logged in', async () => {

    axios.get.mockResolvedValueOnce({
      data: {
        courses: [
          { id: 1, name: 'ES6', credit: 60 },
          { id: 2, name: 'Webpack', credit: 20 },
          { id: 3, name: 'React', credit: 40 },
        ],
      },
    });
  
    render(<App />);
  
    // Simulate login
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const loginButton = screen.getByRole('button', { name: /ok/i });
  
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);
  
    // // Wait for courses to be fetched and rendered
    // await waitFor(() => screen.getByText('ES6')); // Wait for course data to be rendered
  
    // Check if the course list is displayed with the correct number of rows
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(5); // 2 header rows and 3 course rows
});
});
