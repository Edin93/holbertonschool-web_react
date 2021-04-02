import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { notificationReducer, initState, } from './notificationReducer';
import { configure } from 'enzyme';
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


configure({ adapter: new Adapter() });

describe("Testing the notificationReducer", () => {

  let newState = initState;

  it("Test that FETCH_NOTIFICATIONS_SUCCESS returns the data passed", () => {
    let action = fetchNotificationsSuccess();
    let expected = notificationReducer(undefined, action);
    action.data.map(notif => {
      newState.notifications.push({...notif, isRead: false});
    });
    expect(expected).to.deep.equal(newState);
  });

  it("Test that MARK_AS_READ returns the data with the right item updated", () => {
    let ns = notificationReducer(undefined, fetchNotificationsSuccess());
    let action = markAsAread(1);
    let expected = notificationReducer(newState, action);
    newState = {
      filter: ns.filter,
      notifications: []
    };
    ns.notifications.map(course => {
      if (course.id == action.index) {
        newState.notifications.push({...course, isRead: true});
      } else {
        newState.notifications.push(course);
      }
    });
    expect(expected).to.deep.equal(newState);
    newState = ns;
  });

  it("Test that SET_TYPE_FILTER returns the data with the right item updated", () => {
    let action = setNotificationFilter('URGENT');
    let expected = notificationReducer(newState, action);
    newState = {
      ...newState,
      filter: action.filter
    };
    expect(expected).to.deep.equal(newState);
  });

});
