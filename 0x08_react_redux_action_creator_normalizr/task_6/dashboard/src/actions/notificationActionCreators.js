import {
  MARK_AS_READ,
  SET_TYPE_FILTER,
  NotificationTypeFilters,
} from './notificationActionTypes.js';

const markAsAread = (index) => {
  return dispatch({
    type: MARK_AS_READ,
    index,
  });
};

const setNotificationFilter = (filter) => {
  return dispatch({
    type: SET_TYPE_FILTER,
    filter,
  });
};

module.exports = {
  markAsAread,
  setNotificationFilter,
};
