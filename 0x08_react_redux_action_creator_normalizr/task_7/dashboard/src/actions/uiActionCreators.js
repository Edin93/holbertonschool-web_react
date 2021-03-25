import {
  LOGIN,
  LOGOUT,
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from './uiActionTypes.js';
import fetch from 'node-fetch';

const login = (email, password) => {
  return({
    type: LOGIN,
    user: {
      email,
      password,
    },
  });
};

const logout = () => {
  return({
    type: LOGOUT,
  });
};

const displayNotificationDrawer = () => {
  return({
    type: DISPLAY_NOTIFICATION_DRAWER,
  });
};

const hideNotificationDrawer = () => {
  return({
    type: HIDE_NOTIFICATION_DRAWER,
  });
};

const loginSuccess = () => {
  return({
    type: LOGIN_SUCCESS,
  });
};

const loginFailure = () => {
  return({
    type: LOGIN_FAILURE,
  });
};

const loginRequest = (email, password) => {
    dispatch(login(email, password));
    let url = '../../dist/login-success.json';
    fetch(url)
    .then(res => {
      if (res.ok) {
        dispatch(loginSuccess());
      } else {
        dispatch(loginFailure());
      }
    })
    .catch(() => {
      dispatch(loginFailure());
    });
};

module.exports = {
  login,
  logout,
  displayNotificationDrawer,
  hideNotificationDrawer,
  loginSuccess,
  loginFailure,
  loginRequest,
};
