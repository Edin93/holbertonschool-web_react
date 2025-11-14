import { render, screen, fireEvent } from '@testing-library/react';
import NotificationItem from './NotificationItem';

describe('NotificationItem', () => {
  const markAsRead = jest.fn();

  test('renders a default notification', () => {
    render(
      <NotificationItem
        type="default"
        value="New course available"
        markAsRead={markAsRead}
        id={1}
      />
    );
    const listItem = screen.getByRole('listitem');
    expect(listItem).toHaveTextContent('New course available');
    expect(listItem).toHaveAttribute('data-notification-type', 'default');
  });

  test('renders an urgent notification with value', () => {
    render(
      <NotificationItem
        type="urgent"
        value="Urgent requirement: System update needed"
        markAsRead={markAsRead}
        id={2}
      />
    );

    const listItem = screen.getByRole('listitem');
    expect(listItem).toHaveAttribute('data-notification-type', 'urgent');
    expect(listItem).toHaveTextContent('Urgent requirement: System update needed');
  });

  test('renders a default notification with value', () => {
    render(
      <NotificationItem
        type="default"
        value="New course available"
        markAsRead={markAsRead}
        id={1}
      />
    );

    const listItem = screen.getByRole('listitem');
    expect(listItem).toHaveAttribute('data-notification-type', 'default');
    expect(listItem).toHaveTextContent('New course available');
  });

  test('calls markAsRead when clicked', () => {
    render(
      <NotificationItem
        type="default"
        value="New course available"
        markAsRead={markAsRead}
        id={1}
      />
    );
    const listItem = screen.getByRole('listitem');
    fireEvent.click(listItem);
    expect(markAsRead).toHaveBeenCalledTimes(1);
  });
});
