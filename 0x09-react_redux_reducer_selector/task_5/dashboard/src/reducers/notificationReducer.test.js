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
import { notificationsNormalizer } from '../schema/notifications';
import Immutable, { merge, setIn } from 'immutable';

configure({ adapter: new Adapter() });

describe("Testing the notificationReducer", () => {

  let initialState = initState;
  let newState;

  it("Test that FETCH_NOTIFICATIONS_SUCCESS returns the data passed", () => {
    let action = fetchNotificationsSuccess();
    let expected = notificationReducer(undefined, action);
    let notifs = [];
    action.data.map(notif => {
      notifs.push({...notif, isRead: false});
    });
    notifs = notificationsNormalizer(notifs);
    newState = merge(initialState, { 'notifications': notifs, });
    Immutable.is(expected, newState);
  });

  it("Test that MARK_AS_READ returns the data with the right item updated", () => {
    let action = markAsAread(1);
    let expected = notificationReducer(newState, action);
    newState = setIn(newState, ['entities', 'notifications', action.index]);
    expect(expected).to.deep.equal(newState);
  });

  it("Test that SET_TYPE_FILTER returns the data with the right item updated", () => {
    let action = setNotificationFilter('URGENT');
    let expected = notificationReducer(newState, action);
    newState = setIn(newState, ['entities', 'filter', action.filter])
    expect(expected).to.deep.equal(newState);
  });

});
