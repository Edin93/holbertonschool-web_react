import { act, render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import mockAxios from 'jest-mock-axios';
import Notifications from './Notifications';
import notificationsSlice, { fetchNotifications } from '../../features/notifications/notificationsSlice';


describe('Notifications', () => {
  let store;

  const NOTIFICATIONS_DATA = [
    {
      id: '5debd764507712e7a1307303',
      context: {
        type: 'urgent',
        isRead: false,
        value: 'ut labore et dolore magna aliqua. Dignissim convallis aenean et tortor at risus viverra adipiscing. Ac tortor dignissim convallis aenean et.'
      }
    },
    {
      id: '5debd76444dd4dafea89d53b',
      context: {
        type: 'default',
        isRead: false,
        value: 'Non diam phasellus vestibulum lorem sed risus ultricies. Tellus mauris a diam maecenas sed'
      }
    }
  ];

  beforeEach(() => {
    store = configureStore({
      reducer: {
        notifications: notificationsSlice
      },
    });
  });

  afterEach(() => {
    mockAxios.reset();
  });

  test('renders without crashing', async () => {
    const promise = store.dispatch(fetchNotifications());

    mockAxios.mockResponse({
      data: NOTIFICATIONS_DATA
    });

    await promise;

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByText(/ut labore et dolore magna aliqua/i)).toBeInTheDocument();
  });

  test('toggles drawer visibility when clicking the title', async () => {
    const promise = store.dispatch(fetchNotifications());

    mockAxios.mockResponse({
      data: NOTIFICATIONS_DATA
    });

    await promise;

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    expect(screen.getByText(/ut labore et dolore magna aliqua/i)).toBeInTheDocument();
  });

  test('close drawer on close button', async () => {
    const promise = store.dispatch(fetchNotifications());

    mockAxios.mockResponse({
      data: NOTIFICATIONS_DATA
    });

    await promise;

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    expect(screen.getByText(/ut labore et dolore magna aliqua/i)).toBeInTheDocument();
  });

  test('marks notification as read', async () => {
    const promise = store.dispatch(fetchNotifications());

    mockAxios.mockResponse({
      data: NOTIFICATIONS_DATA
    });

    await promise;

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    const notifications = screen.getAllByRole('listitem');
    fireEvent.click(notifications[0]);

    const state = store.getState().notifications;
    expect(state.notifications).toHaveLength(1);
  });

  test('displays "No new notifications" when there are no notifications', async () => {
    const promise = store.dispatch(fetchNotifications());

    mockAxios.mockResponse({
      data: []
    });

    await promise;

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    expect(screen.getByText(/no new notifications for now/i)).toBeInTheDocument();
  });

  test('does not re-render when drawer visibility is toggled', async () => {
    const promise = store.dispatch(fetchNotifications());

    mockAxios.mockResponse({
      data: NOTIFICATIONS_DATA
    });

    await promise;

    let renderCount = 0;
    const MemoizedNotifications = Notifications;
    const OriginalNotifications = MemoizedNotifications.type;

    MemoizedNotifications.type = function MockNotifications(props) {
      renderCount++;
      return OriginalNotifications(props);
    };

    render(
      <Provider store={store}>
        <MemoizedNotifications />
      </Provider>
    );

    expect(renderCount).toBe(1);

    expect(screen.getByText(/ut labore et dolore magna aliqua/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/your notifications/i));
    expect(renderCount).toBe(1);

    fireEvent.click(screen.getByText(/your notifications/i));
    expect(renderCount).toBe(1);
  });

  test('displays loading indicator with fake timers', async () => {
    jest.useFakeTimers();

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    act(() => {
      store.dispatch(fetchNotifications());
    });

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    act(() => {
      mockAxios.mockResponse({
        data: []
      });
    });

    await act(async () => {
      await jest.runAllTimersAsync();
    });

    jest.useRealTimers();
  });

  describe('Notification filtering', () => {
    test('toggles urgent filter correctly', async () => {
      const promise = store.dispatch(fetchNotifications());

      mockAxios.mockResponse({
        data: NOTIFICATIONS_DATA
      });

      await promise;

      render(
        <Provider store={store}>
          <Notifications />
        </Provider>
      );

      expect(screen.getAllByRole('listitem')).toHaveLength(2);

      const urgentButton = screen.getByText('‼️');

      fireEvent.click(urgentButton);
      expect(screen.getAllByRole('listitem')).toHaveLength(1);

      fireEvent.click(urgentButton);
      expect(screen.getAllByRole('listitem')).toHaveLength(2);
    });

    test('toggles default filter correctly', async () => {
      const promise = store.dispatch(fetchNotifications());

      mockAxios.mockResponse({
        data: NOTIFICATIONS_DATA
      });

      await promise;

      render(
        <Provider store={store}>
          <Notifications />
        </Provider>
      );

      expect(screen.getAllByRole('listitem')).toHaveLength(2);

      const defaultButton = screen.getByText('??');

      fireEvent.click(defaultButton);
      expect(screen.getAllByRole('listitem')).toHaveLength(1);
      
      fireEvent.click(defaultButton);
      expect(screen.getAllByRole('listitem')).toHaveLength(2);
    });
  });
});

