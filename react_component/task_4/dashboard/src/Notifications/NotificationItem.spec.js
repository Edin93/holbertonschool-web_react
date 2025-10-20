import { render, screen, fireEvent } from '@testing-library/react';
import NotificationItem from './NotificationItem';
import { getLatestNotification } from '../utils/utils';


test('it should display the correct notification with a red color, and set the "data-notification-type" to urgent whenever it receives the type "urgent" props', () => {
  const props = {
    type: 'urgent',
    html: {__html: getLatestNotification()},
  }

  render(<NotificationItem {...props} />);

  const liElement = screen.getByRole('listitem');

  expect(liElement).toHaveStyle({ color: 'red' });
  expect(liElement).toHaveAttribute('data-notification-type', 'urgent');
});

test('it should display the correct notification with a blue color, and set the "data-notification-type" to default whenever it receives the type "default" props', () => {
  const props = {
    type: 'default',
    html: undefined,
  }

  render(<NotificationItem {...props} />);

  const liElement = screen.getByRole('listitem');

  expect(liElement).toHaveStyle({ color: 'blue' });
  expect(liElement).toHaveAttribute('data-notification-type', 'default');
});

test('it should call markAsRead with the correct id when the notification item is clicked', () => {
  const mockMarkAsRead = jest.fn();
  const props = {
    id: 42,
    type: 'default',
    value: 'Test notification',
    markAsRead: mockMarkAsRead,
  };

  render(<NotificationItem {...props} />);

  const liElement = screen.getByRole('listitem');

  fireEvent.click(liElement);

  expect(mockMarkAsRead).toHaveBeenCalledTimes(1);
  expect(mockMarkAsRead).toHaveBeenCalledWith(42);
});
