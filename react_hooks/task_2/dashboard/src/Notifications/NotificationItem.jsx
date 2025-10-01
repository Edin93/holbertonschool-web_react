import { memo } from 'react';

const NotificationItem = memo(({ type, value, html, markAsRead}) => {
  return (
    <li
      style={{ color: type === 'default' ? 'blue' : 'red' }}
      data-notification-type={type}
      dangerouslySetInnerHTML={type === 'urgent' && html !== undefined ? html : undefined}
      onClick={markAsRead}
    >
      {type === 'urgent' && html !== undefined ? null : value}
    </li>
  );
});

export default NotificationItem;
