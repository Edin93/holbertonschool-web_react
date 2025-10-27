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

describe('NotificationItem - Pure Component behavior', () => {
  const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
  let markAsRead;

  beforeEach(() => {
    jest.clearAllMocks();
    markAsRead = jest.fn();
  });

  test('should re-render when props change', () => {
    const { rerender } = render(
      <NotificationItem
        id={1}
        type="urgent"
        value="New notification"
        markAsRead={markAsRead}
      />
    );

    const renderSpy = jest.spyOn(NotificationItem.prototype, 'render');

    rerender(
      <NotificationItem
        id={1}
        type="urgent"
        value="Updated notification"
        markAsRead={markAsRead}
      />
    );

    expect(renderSpy).toHaveBeenCalled();
    renderSpy.mockRestore();
  });

  test('should not re-render when props do not change', () => {
    const renderSpy = jest.spyOn(NotificationItem.prototype, 'render');

    const { rerender } = render(
      <NotificationItem
        id={1}
        type="urgent"
        value="New notification"
        markAsRead={markAsRead}
      />
    );

    const renderCount = renderSpy.mock.calls.length;

    rerender(
      <NotificationItem
        id={1}
        type="urgent"
        value="New notification"
        markAsRead={markAsRead}
      />
    );

    expect(renderSpy.mock.calls.length).toBe(renderCount);
    renderSpy.mockRestore();
  });
});
