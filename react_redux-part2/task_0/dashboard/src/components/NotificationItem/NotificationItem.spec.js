import { render, screen, fireEvent } from '@testing-library/react';
import NotificationItem from './NotificationItem';

describe('NotificationItem', () => {
    const markAsRead = jest.fn();
    test('Renders a default notification', () => {
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
        expect(listItem).toHaveStyle('color: blue');
    });

    test('Renders an urgent notification with HTML', () => {
        const html = { __html: '<u>Urgent requirement</u>' };
        render(
            <NotificationItem
                type="urgent"
                html={html}
                markAsRead={markAsRead}
                id={2}
            />
        );
        const listItem = screen.getByRole('listitem');
        expect(listItem).toHaveAttribute('data-notification-type', 'urgent');
        expect(listItem).toHaveStyle('color: red');
        expect(listItem).toContainHTML('<u>Urgent requirement</u>');
    });

    test('Renders an urgent notification without HTML', () => {
        render(
            <NotificationItem
                type="urgent"
                value="Urgent requirement"
                markAsRead={markAsRead}
                id={3}
            />
        );
        const listItem = screen.getByRole('listitem');
        expect(listItem).toHaveTextContent('Urgent requirement');
        expect(listItem).toHaveAttribute('data-notification-type', 'urgent');
        expect(listItem).toHaveStyle('color: red');
    });

    test('Calls markAsRead when clicked', () => {
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
