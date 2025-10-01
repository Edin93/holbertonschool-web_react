import { Component } from 'react';

class NotificationItem extends Component {

    render() {
        const { type, html, value, markAsRead, id } = this.props;
        if (type === 'default') {
            return (
                <li
                    style={{ color: "blue" }}
                    data-notification-type={type}
                    onClick={() => markAsRead(id)}
                >{value}</li>
            );
        } else if (type === 'urgent' && html !== undefined) {
            return (
                <li
                    style={{ color: "red" }}
                    data-notification-type={type}
                    dangerouslySetInnerHTML={html}
                    onClick={() => markAsRead(id)}
                ></li>
            );
        } else {
            return (
                <li
                    style={{ color: "red" }}
                    data-notification-type={type}
                    onClick={() => markAsRead(id)}
                >{value}</li>
            );
        }
    }
}

export default NotificationItem;
