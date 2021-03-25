import { LOGIN, LOGOUT, DISPLAY_NOTIFICATION_DRAWER, HIDE_NOTIFICATION_DRAWER, } from './uiActionTypes.js';

const login = (email, password) => {
  return {
    type: LOGIN,
    user: {
      email,
      password,
    },
  };
};

const logout = () => {
  return {
    type: LOGOUT,
  };
};

const displayNotificationDrawer = () => {
  return {
    type: DISPLAY_NOTIFICATION_DRAWER,
  };
};

const hideNotificationDrawer = () => {
  return {
    type: HIDE_NOTIFICATION_DRAWER,
  };
};

module.exports = {
  login,
  logout,
  displayNotificationDrawer,
  hideNotificationDrawer,
};
