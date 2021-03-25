import { LOGIN, LOGOUT, DISPLAY_NOTIFICATION_DRAWER, HIDE_NOTIFICATION_DRAWER, } from './uiActionTypes.js';

const login = (email, password) => {
  return dispatch({
    type: LOGIN,
    user: {
      email,
      password,
    },
  });
};

const logout = () => {
  return dispatch({
    type: LOGOUT,
  });
};

const displayNotificationDrawer = () => {
  return dispatch({
    type: DISPLAY_NOTIFICATION_DRAWER,
  });
};

const hideNotificationDrawer = () => {
  return dispatch({
    type: HIDE_NOTIFICATION_DRAWER,
  });
};

module.exports = {
  login,
  logout,
  displayNotificationDrawer,
  hideNotificationDrawer,
};
