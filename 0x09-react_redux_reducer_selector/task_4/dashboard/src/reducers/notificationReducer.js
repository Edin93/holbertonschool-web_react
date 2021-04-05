import {
  MARK_AS_READ,
  SET_TYPE_FILTER,
  NotificationTypeFilters,
  FETCH_NOTIFICATIONS_SUCCESS,
} from '../actions/notificationActionTypes.js';
import {
  markAsAread,
  setNotificationFilter,
  fetchNotificationsSuccess
} from '../actions/notificationActionCreators.js';

export const initState = {
  filter: 'DEFAULT',
  notifications: [],
};

export let notificationReducer = (state = initState, action) => {
  let newState = state;
  switch(action.type) {
    case FETCH_NOTIFICATIONS_SUCCESS:
      newState = state;
      action.data.map(course => {
        newState.notifications.push({...course, isRead: false });
      });
      return newState;
    case MARK_AS_READ:
      newState = {
        filter: state.filter,
        notifications: [],
      };
      state.notifications.map(course => {
        if (course.id == action.index) {
          newState.notifications.push({...course, isRead: true});
        } else {
          newState.notifications.push(course);
        }
      });
      return newState;
    case SET_TYPE_FILTER:
      newState = {
        ...state,
        filter: action.filter,
      };
      return newState;
    default:
      return state;
  };
};
