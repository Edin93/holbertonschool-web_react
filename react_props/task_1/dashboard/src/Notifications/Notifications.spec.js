import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, describe, jest } from '@jest/globals';
import Notifications from '../Notifications/Notifications.jsx';

describe('Notifications Component', () => {
  test('renders the notifications title', () => {
    render(<Notifications />);
    const titleElement = screen.getByText(/Here is the list of notifications/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders the close button', () => {
    render(<Notifications />);
    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toBeInTheDocument();
  });

  test('renders three list items', () => {
    render(<Notifications />);
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(3);
  });

  test('logs message when close button is clicked', () => {
    render(<Notifications />);
    const consoleLog = jest.spyOn(console, 'log').mockImplementation();
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(consoleLog).toHaveBeenCalledWith(expect.stringMatching(/Close button has been clicked/i));
  });
});
