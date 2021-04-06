import Immutable from "immutable";

const filterTypeSelected = (state) => {
  return state.toJS().filter;
};

const getNotifications = (state) => {
  let notifs = state.get('notifications');
  return new Immutable.Map(notifs);
};

const getUnreadNotifications = (state) => {
  let unreadNotifs = Object.values(state.get('notifications')).filter(n => !n.isRead);
  return new Immutable.Map(unreadNotifs);
};

module.exports = {
  filterTypeSelected,
  getNotifications,
  getUnreadNotifications,
};
