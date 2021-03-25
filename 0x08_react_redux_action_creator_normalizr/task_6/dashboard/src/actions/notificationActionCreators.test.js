import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount, } from 'enzyme';
import { StyleSheetTestUtils, } from 'aphrodite';
import {
  MARK_AS_READ,
  SET_TYPE_FILTER,
  NotificationTypeFilters,
} from './notificationActionTypes.js';
import {
  markAsAread,
  setNotificationFilter,
} from './notificationActionCreators.js';

configure({ adapter: new Adapter() });

StyleSheetTestUtils.suppressStyleInjection();

describe("Testing the Notification Action Creators.", () => {

  it("Testing the markAsAread action", () => {
    const expectedResult = {
      type: MARK_AS_READ,
      index: 1
    };
    let result = markAsAread(1);
    expect(result).toMatchObject(expectedResult);
  });

  it("Testing the setNotificationFilter action", () => {
    const expectedResult = {
      type: SET_TYPE_FILTER,
      filter: "DEFAULT"
    };

    let result = setNotificationFilter(NotificationTypeFilters['DEFAULT']);
    expect(result).toMatchObject(expectedResult);
  });

});
