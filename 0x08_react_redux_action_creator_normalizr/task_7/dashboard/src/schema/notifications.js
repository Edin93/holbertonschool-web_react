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

const getAllNotificationsByUser = (userId) => {
  let result = [];

  for (const [key, value] of Object.entries(normalizedData.entities.notifications)) {
    if (value.author === userId) {
      result.push(normalizedData.entities.messages[value.context]);
    }
  }
  return result;
};

module.exports = {
  normalizedData,
  getAllNotificationsByUser,
};
