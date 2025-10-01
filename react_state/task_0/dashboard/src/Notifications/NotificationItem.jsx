import React, { PureComponent } from 'react';

class NotificationItem extends PureComponent {
    render() {
        const { type, value, html, markAsRead } = this.props;
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
    }
}

export default NotificationItem;
