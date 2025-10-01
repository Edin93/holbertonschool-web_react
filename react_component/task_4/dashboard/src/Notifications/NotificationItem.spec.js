import { render, screen, fireEvent, afterEach } from '@testing-library/react';
import NotificationItem from './NotificationItem';
import { getLatestNotification } from '../utils/utils';
import { test, expect, jest } from '@jest/globals';

test('NotificationItem is rendered without crashing', () => {
    render(<NotificationItem />)
})

test('Should display the correct notification with a red color, and set the "data-notification-type" to urgent whenever it receives the type "urgent" props', () => {
    const props = {
        type: 'urgent',
        html: { __html: getLatestNotification() },
    }
    render(<NotificationItem {...props} />);
    const liElement = screen.getByRole('listitem');
    expect(liElement).toHaveStyle({ color: 'red' });
    expect(liElement).toHaveAttribute('data-notification-type', 'urgent');
});

test('Should display the correct notification with a blue color, and set the "data-notification-type" to default whenever it receives the type "default" props', () => {
    const props = {
        type: 'default',
        html: undefined,
    }
    render(<NotificationItem {...props} />);
    const liElement = screen.getByRole('listitem');
    expect(liElement).toHaveStyle({ color: 'blue' });
    expect(liElement).toHaveAttribute('data-notification-type', 'default');
});

test('Should log to the console the "Notification id has been marked as read" with the correct notification item id', () => {
    const mockMarkAsRead = jest.fn()
    render(<NotificationItem markAsRead={mockMarkAsRead} />);
    const firstListItemElement = screen.getAllByRole('listitem')[0];
    fireEvent.click(firstListItemElement)
    expect(mockMarkAsRead).toHaveBeenCalled()
});
