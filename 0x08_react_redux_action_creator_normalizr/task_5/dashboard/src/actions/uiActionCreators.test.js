import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount, } from 'enzyme';
import { StyleSheetTestUtils, } from 'aphrodite';
import {
  LOGIN,
  LOGOUT,
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
} from './uiActionTypes.js';
import {
  login,
  logout,
  displayNotificationDrawer,
  hideNotificationDrawer,
} from './uiActionCreators.js';

configure({ adapter: new Adapter() });

StyleSheetTestUtils.suppressStyleInjection();

describe("Testing the UI Action Creators.", () => {

  it("Testing the login action", () => {
    const expectedResult = {
      type: LOGIN,
      user: {
        email: 'user@gmail.com',
        password: '123abc',
      }
    };
    let result = login('user@gmail.com', '123abc');
    expect(result).toMatchObject(expectedResult);
  });

  it("Testing the logout action", () => {
    const expectedResult = { type: LOGOUT };
    let result = logout();
    expect(result).toMatchObject(expectedResult);
  });

  it("Testing the displayNotificationDrawer action", () => {
    const expectedResult = { type: DISPLAY_NOTIFICATION_DRAWER };
    let result = displayNotificationDrawer();
    expect(result).toMatchObject(expectedResult);
  });

  it("Testing the hideNotificationDrawer action", () => {
    const expectedResult = { type: HIDE_NOTIFICATION_DRAWER };
    let result = hideNotificationDrawer();
    expect(result).toMatchObject(expectedResult);
  });

});
