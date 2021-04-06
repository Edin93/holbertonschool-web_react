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
import Immutable, { setIn, merge } from 'immutable';
import { notificationsNormalizer, } from '../schema/notifications';

export const initState = {
  filter: 'DEFAULT',
  notifications: [],
};

export let notificationReducer = (state = new Immutable.Map(initState), action) => {
  let newState = state;
  switch(action.type) {
    case FETCH_NOTIFICATIONS_SUCCESS:
      let notifs = [];
      action.data.map(course => {
        notifs.push({...course, isRead: false });
      });
      notifs = notificationsNormalizer(notifs);
      return merge(state, { 'notifications': notifs, });
    case MARK_AS_READ:
      return setIn(state, ['entities', 'notifications', action.index])
    case SET_TYPE_FILTER:
      return setIn(state, ['entities', 'filter', action.filter]);
    default:
      return state;
  };
};
