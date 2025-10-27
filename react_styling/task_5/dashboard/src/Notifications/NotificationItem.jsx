import React, { PureComponent } from 'react';

export default class NotificationItem extends PureComponent {
  render() {
    const { type, html, value, markAsRead, id } = this.props;
    
    if (type === 'default') {
      return (
        <li 
          className="text-[color:var(--default-notification-item)] pl-1 max-[912px]:text-[20px] max-[912px]:w-full max-[912px]:border-b max-[912px]:border-black max-[912px]:p-[10px_8px]"
          data-notification-type={type}
          onClick={() => markAsRead(id)}
        >{value}</li>
      );
    } else if (type === 'urgent' && html !== undefined) {
      return (
        <li 
          className="text-[color:var(--urgent-notification-item)] pl-1 max-[912px]:text-[20px] max-[912px]:w-full max-[912px]:border-b max-[912px]:border-black max-[912px]:p-[10px_8px]"
          data-notification-type={type} 
          dangerouslySetInnerHTML={html}
          onClick={() => markAsRead(id)}
        ></li>
      );
    } else {
      return (
        <li 
          className="text-[color:var(--urgent-notification-item)] pl-1 max-[912px]:text-[20px] max-[912px]:w-full max-[912px]:border-b max-[912px]:border-black max-[912px]:p-[10px_8px]"
          data-notification-type={type}
          onClick={() => markAsRead(id)}
        >{value}</li>
      );
    }
  }
}
