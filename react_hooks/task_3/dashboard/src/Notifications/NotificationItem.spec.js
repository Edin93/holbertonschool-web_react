import { render, screen, fireEvent } from '@testing-library/react';
import NotificationItem from './NotificationItem';


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

describe('NotificationItem - React.memo behavior', () => {
  let markAsRead;

  beforeEach(() => {
    jest.clearAllMocks();
    markAsRead = jest.fn();
  });

  test('should update when props change', () => {
    const { rerender, container } = render(
      <NotificationItem
        id={1}
        type="urgent"
        value="New notification"
        markAsRead={markAsRead}
      />
    );

    const firstRender = container.querySelector('[data-notification-type]').textContent;

    rerender(
      <NotificationItem
        id={1}
        type="urgent"
        value="Updated notification"
        markAsRead={markAsRead}
      />
    );

    const secondRender = container.querySelector('[data-notification-type]').textContent;
    expect(secondRender).not.toBe(firstRender);
    expect(secondRender).toBe('Updated notification');
  });

  test('should not re-render when props do not change', () => {
    const { rerender, container } = render(
      <NotificationItem
        id={1}
        type="urgent"
        value="New notification"
        markAsRead={markAsRead}
      />
    );

    const firstElement = container.querySelector('[data-notification-type]');

    rerender(
      <NotificationItem
        id={1}
        type="urgent"
        value="New notification"
        markAsRead={markAsRead}
      />
    );

    const secondElement = container.querySelector('[data-notification-type]');
    expect(secondElement.textContent).toBe(firstElement.textContent);
  });
});
