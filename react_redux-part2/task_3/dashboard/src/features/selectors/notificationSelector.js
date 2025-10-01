import { createSelector } from 'reselect';
const selectNotifications = (state) => state.notifications.notifications;

export const getFilteredNotifications = createSelector(
    [selectNotifications, (state, filter) => filter],
    (notifications, filter) => {
        if (filter === 'all') {
            return notifications;
        }
        return notifications.filter(notification => notification.type === filter);
    }
);
