import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotificationItem from './NotificationItem';
import { getLatestNotification } from '../../utils/utils';

test('The NotificationItem is rendered without crashing', () => {
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

test('It should log to the console the "Notification id has been marked as read" with the correct notification item id', () => {
    const mockMarkAsRead = jest.fn()
    render(<NotificationItem markAsRead={mockMarkAsRead} />);
    const firstListItemElement = screen.getAllByRole('listitem')[0];
    fireEvent.click(firstListItemElement)
    expect(mockMarkAsRead).toHaveBeenCalled()
});

describe('NotificationItem - Memo behavior', () => {
    let renderCount;
    beforeEach(() => {
        renderCount = 0;
        jest.spyOn(console, 'log').mockImplementation((msg) => {
            if (msg.includes('Rendering NotificationItem')) {
                renderCount++;
            }
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Should not re-render with same props', () => {
        const markAsRead = jest.fn();
        const { rerender } = render(
            <NotificationItem
                id={1}
                type="urgent"
                value="New notification"
                markAsRead={markAsRead}
            />
        );
        expect(renderCount).toBe(1);
        rerender(
            <NotificationItem
                id={1}
                type="urgent"
                value="New notification"
                markAsRead={markAsRead}
            />
        );
        expect(renderCount).toBe(1);
    });

    test('Should re-render when props change', () => {
        const markAsRead = jest.fn();
        const { rerender } = render(
            <NotificationItem
                id={1}
                type="urgent"
                value="New notification"
                markAsRead={markAsRead}
            />
        );
        expect(renderCount).toBe(1);
        rerender(
            <NotificationItem
                id={1}
                type="urgent"
                value="Updated notification"
                markAsRead={markAsRead}
            />
        );
        expect(renderCount).toBe(2);
    });

    test('Should re-render with new function reference', () => {
        const { rerender } = render(
            <NotificationItem
                id={1}
                type="urgent"
                value="New notification"
                markAsRead={() => { }}
            />
        );
        expect(renderCount).toBe(1);
        rerender(
            <NotificationItem
                id={1}
                type="urgent"
                value="New notification"
                markAsRead={() => { }}
            />
        );
        expect(renderCount).toBe(2);
    });
});

test('Should return true if the NotificationItem component is a functional component', () => {
    expect(typeof NotificationItem.type).toBe('function');
    expect(NotificationItem.$$typeof.toString()).toBe('Symbol(react.memo)');
    expect(NotificationItem.type.prototype?.isReactComponent).toBeUndefined();
})
