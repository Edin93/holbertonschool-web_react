import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import Immutable, { merge, setIn } from 'immutable';
import {
  filterTypeSelected,
  getNotifications,
  getUnreadNotifications,
} from './notificationSelector';
import {
  fetchNotificationsSuccess,
} from '../actions/notificationActionCreators';
import { notificationsNormalizer } from '../schema/notifications';
import { notificationReducer, initState } from './../reducers/notificationReducer';

configure({ adapter: new Adapter() });

describe("Testing the notificationSelector", () => {

  it("test that filterTypeSelected works as expected", () => {
    let action = fetchNotificationsSuccess();
    let expected = notificationReducer(undefined, action);
    let result = filterTypeSelected(expected);
    expect(expected.toJS().filter).to.equal(result);
  });

  it("test that getNotifications returns a list of the message entities within the reducer", () => {
    let action = fetchNotificationsSuccess();
    let expected = notificationReducer(undefined, action);
    let result = getNotifications(expected);
    Immutable.is(expected.get('notifications'), result);
  });

  it("test that getUnreadNotifications return a list of the message entities within the reducer", () => {
    let action = fetchNotificationsSuccess();
    let expected = notificationReducer(undefined, action);
    let result = getUnreadNotifications(expected);
    expected = Object.values(expected.get('notifications')).filter(n => !n.isRead);
    Immutable.is(expected, result);
  });

});
