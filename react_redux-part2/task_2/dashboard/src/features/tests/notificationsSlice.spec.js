import notificationsSlice, {
  markNotificationAsRead,
  fetchNotifications,
} from '../notifications/notificationsSlice';
import mockAxios from 'jest-mock-axios';

afterEach(() => {
  mockAxios.reset();
});

describe('notificationsSlice', () => {
  const initialState = {
    notifications: [],
    loading: false,
  };

  test('should return the initial state', () => {
    expect(notificationsSlice(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  test('should handle markNotificationAsRead', () => {
    const stateWithNotifications = {
      ...initialState,
      notifications: [
        { id: 1, message: 'Notification 1' },
        { id: 2, message: 'Notification 2' },
      ],
    };
    const action = markNotificationAsRead(1);
    const expectedState = {
      ...stateWithNotifications,
      notifications: [{ id: 2, message: 'Notification 2' }],
    };
    expect(notificationsSlice(stateWithNotifications, action)).toEqual(
      expectedState
    );
  });

  describe('fetchNotifications async thunk', () => {
    test('should handle fetchNotifications.pending', () => {
      const action = { type: fetchNotifications.pending.type };
      const state = notificationsSlice(initialState, action);
      expect(state).toEqual({
        ...initialState,
        loading: true,
      });
    });

    test('should handle fetchNotifications.rejected', () => {
      const action = {
        type: fetchNotifications.rejected.type,
      };
      const state = notificationsSlice(initialState, action);
      expect(state).toEqual({
        ...initialState,
        loading: false,
      });
    });

    test('should handle fetchNotifications.fulfilled when API request is successful', async () => {
      const notifications = [
        { id: 1, type: "default", value: "New course available" },
        { id: 2, type: "urgent", value: "New resume available" },
        { id: 3, type: 'urgent', value: 'Placeholder' },
      ];

      const dispatch = jest.fn();
      const getState = jest.fn();

      const promise = fetchNotifications()(dispatch, getState, null);

      mockAxios.mockResponse({
        data: { notifications },
      });

      await promise;

      expect(dispatch).toHaveBeenCalledTimes(2);

      const fulfilledAction = dispatch.mock.calls[1][0];

      expect(fulfilledAction.type).toEqual(fetchNotifications.fulfilled.type);
      expect(fulfilledAction.payload).toEqual([
        { id: 1, type: "default", value: "New course available" },
        { id: 2, type: "urgent", value: "New resume available" },
        { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } },
      ]);
    });
  });
});
