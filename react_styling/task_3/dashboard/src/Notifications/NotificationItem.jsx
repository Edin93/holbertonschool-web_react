import React, { PureComponent } from 'react';

export default class NotificationItem extends PureComponent {
  render() {
    const { type, html, value, markAsRead, id } = this.props;
    // this console.log is only for test purposes and not mentionned/required in the student code
    // console.log(`Rendering NotificationItem with id: ${id}, type: ${type}, value: ${value}`);
    
    if (type === 'default') {
      return (
        <li 
          className="text-[color:var(--default-notification-item)] pl-1"
          data-notification-type={type}
          onClick={() => markAsRead(id)}
        >{value}</li>
      );
    } else if (type === 'urgent' && html !== undefined) {
      return (
        <li 
          className="text-[color:var(--urgent-notification-item)] pl-1"
          data-notification-type={type} 
          dangerouslySetInnerHTML={html}
          onClick={() => markAsRead(id)}
        ></li>
      );
    } else {
      return (
        <li 
          className="text-[color:var(--urgent-notification-item)] pl-1"
          data-notification-type={type}
          onClick={() => markAsRead(id)}
        >{value}</li>
      );
    }
  }
}
