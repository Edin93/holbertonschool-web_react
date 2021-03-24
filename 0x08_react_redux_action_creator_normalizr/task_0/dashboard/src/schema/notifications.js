import * as jsonData from '../../notifications.json';

const getAllNotificationsByUser = (userId) => {
  // console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  // console.log(typeof(jsonData));
  // console.log(jsonData);
  // console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  let data = jsonData;
  let result = [];
  for (const [key, notif] of Object.entries(data)) {
    // console.log(notif['author']['id']);
    if (notif && notif.author && notif.author.id == userId) {
      result.push(notif.context);
    }
  }
  return result;
};

module.exports = {
  getAllNotificationsByUser,
};
