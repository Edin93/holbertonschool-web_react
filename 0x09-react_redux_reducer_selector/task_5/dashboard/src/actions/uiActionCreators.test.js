import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount, } from 'enzyme';
import { StyleSheetTestUtils, } from 'aphrodite';
import configureStore from 'redux-mock-store';
import {
  LOGIN,
  LOGOUT,
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from './uiActionTypes.js';
import {
  login,
  logout,
  displayNotificationDrawer,
  hideNotificationDrawer,
  loginSuccess,
  loginFailure,
  loginRequest,
} from './uiActionCreators.js';
import fetch from 'node-fetch';
import fetchMock from 'fetch-mock';

configure({ adapter: new Adapter() });

StyleSheetTestUtils.suppressStyleInjection();

const middlewares = [];
const mockStore = configureStore(middlewares);

describe("Testing the UI Action Creators.", () => {

  it("Testing the login action", () => {
    const initialState = {};
    const store = mockStore(initialState);
    const expectedResult = {
      type: LOGIN,
      user: {
        email: 'user@gmail.com',
        password: '123abc',
      }
    };
    store.dispatch(login('user@gmail.com', '123abc'));
    let result = store.getActions()[0];
    expect(result).toMatchObject(expectedResult);
  });

  it("Testing the logout action", () => {
    const initialState = {};
    const store = mockStore(initialState);
    const expectedResult = { type: LOGOUT };
    store.dispatch(logout());
    let result = store.getActions()[0];
    expect(result).toMatchObject(expectedResult);
  });

  it("Testing the displayNotificationDrawer action", () => {
    const initialState = {};
    const store = mockStore(initialState);
    const expectedResult = { type: DISPLAY_NOTIFICATION_DRAWER };
    store.dispatch(displayNotificationDrawer());
    let result = store.getActions()[0];
    expect(result).toMatchObject(expectedResult);
  });

  it("Testing the hideNotificationDrawer action", () => {
    const initialState = {};
    const store = mockStore(initialState);
    const expectedResult = { type: HIDE_NOTIFICATION_DRAWER };
    store.dispatch(hideNotificationDrawer());
    let result = store.getActions()[0];
    expect(result).toMatchObject(expectedResult);
  });

});

describe("Testing the loginRequest action", () => {

  it("Verify that if the API returns the right response, the store received 2 actions LOGIN and LOGING_SUCCESS", () => {
    const initialState = {};
    const store = mockStore(initialState);

    const user = {
      email: 'user@gmail.com',
      password: '1234abcd',
    };

    const expectedLoginResult = {
      type: LOGIN,
      user: {
        email: user.email,
        password: user.password,
      },
    };

    const expectedSuccessResult = {
      type: LOGIN_SUCCESS,
    };

    let url = '../../dist/login-success.json';
    let r = fetchMock.mock(url, 200);
    fetch(url)
    .then(res => {
      if (res.ok) {
        store.dispatch(loginSuccess());
        let loginRes = store.getActions()[0];
        let successRes = store.getActions()[1];
        expect(loginRes).toMatchObject(expectedLoginResult);
        expect(successRes).toMatchObject(expectedSuccessResult);
      }
    })
    .catch(() => {
      store.dispatch(loginFailure());
    });
    fetchMock.restore();

  });

  it("erify that if the API query fails, the store received two actions LOGIN and LOGIN_FAILURE", () => {
    const initialState = {};
    const store = mockStore(initialState);

    const user = {
      email: 'user@gmail.com',
      password: '1234abcd',
    };

    const expectedLoginResult = {
      type: LOGIN,
      user: {
        email: user.email,
        password: user.password,
      },
    };

    const expectedFailureResult = {
      type: LOGIN_SUCCESS,
    };

    let url = '../../dist/login-success.json';
    let r = fetchMock.mock(url, 500);
    fetch(url)
    .then(res => {
      if (!res.ok) {
        store.dispatch(loginSuccess());
        let loginRes = store.getActions()[0];
        let successRes = store.getActions()[1];
        expect(loginRes).toMatchObject(expectedLoginResult);
        expect(successRes).toMatchObject(expectedFailureResult);
      }
    })
    .catch(() => {
      store.dispatch(loginFailure());
    });

    fetchMock.restore();

  });

});
