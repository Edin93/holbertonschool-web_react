import { createSelector } from 'reselect';

const selectNotifications = (state) => state.notifications.notifications;

export const getFilteredNotifications = createSelector(
  [selectNotifications, (_, filter) => filter],
  (notifications, filter) => {
    return notifications.filter(notification => 
      filter === 'all' || notification.type === filter
    );
  }
);
