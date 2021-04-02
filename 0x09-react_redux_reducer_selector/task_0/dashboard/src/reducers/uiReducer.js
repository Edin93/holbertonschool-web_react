import {
  LOGIN,
  LOGOUT,
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from '../actions/uiActionTypes';

export let initState = {
  isNotificationDrawerVisible: false,
  isUserLoggedIn: false,
  user: {},
};

export let uiReducer = (state = initState, action) => {
  switch (action.type) {
    case DISPLAY_NOTIFICATION_DRAWER: {
      return {
        ...state,
        isNotificationDrawerVisible: true,
      };
    };
    case HIDE_NOTIFICATION_DRAWER: {
      return {
        ...state,
        isNotificationDrawerVisible: false,
      };
    };
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isUserLoggedIn: true,
      };
    };
    case LOGIN_FAILURE: {
      return {
        ...state,
        isUserLoggedIn: false,
      };
    };
    case LOGOUT: {
      return {
        ...state,
        isUserLoggedIn: false,
      };
    };
    default:
      return state;
  }
};
