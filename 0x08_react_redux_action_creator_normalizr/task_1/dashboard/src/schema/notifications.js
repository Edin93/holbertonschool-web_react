import jsonData from '../../notifications.json';
import { normalize, schema } from 'normalizr';

const user = new schema.Entity("users");

const message = new schema.Entity(
  "messages",
  {},
  {
    idAttribute: 'guid',
  },
);

const notification = new schema.Entity("notifications", {
  author: user,
  context: message,
});

const mySchema = new schema.Array(notification);

let normalizedData = normalize(jsonData, mySchema);

// console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
// console.log(normalizedData);
// console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

// console.log(normalizedData.entities.notifications);
// console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

const getAllNotificationsByUser = (userId) => {
  let result = [];
  Object.values(normalizedData.entities.notifications).forEach(notif => {
    if (notif.author === userId) {
      result.push(notif);
    }
  });
  return result;
};

module.exports = {
  normalizedData,
  getAllNotificationsByUser,
};
