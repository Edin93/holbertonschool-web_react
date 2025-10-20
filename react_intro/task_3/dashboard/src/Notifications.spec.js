import { render, screen, fireEvent } from '@testing-library/react';
import Notifications from "./Notifications";
import { getLatestNotification } from './utils';

jest.mock('./utils', () => ({
  getLatestNotification: jest.fn(),
}));

describe('Notifications component', () => {
  beforeEach(() => {
    getLatestNotification.mockReturnValue('<strong>Urgent requirement</strong> - complete by EOD');
  });

  test('renders the notifications title', () => {
    render(<Notifications />);
    const titleElement = screen.getByText(/here is the list of notifications/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders the close button', () => {
    render(<Notifications />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders three notifications', () => {
    render(<Notifications />);
    const listItemElements = screen.getAllByRole('listitem');
    expect(listItemElements).toHaveLength(3);
  });

  test('logs message when close button is clicked', () => {
    render(<Notifications />);
    const consoleSpy = jest.spyOn(console, 'log');
    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringMatching(/close button has been clicked/i));
    consoleSpy.mockRestore();
  });
});
