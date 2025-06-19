import { memo } from 'react';

const NotificationItem = memo(function NotificationItem({
    type,
    html,
    value,
    markAsRead,
    id
}) {
    console.log(`Rendering NotificationItem with id: ${id}, type: ${type}, value: ${value}`);
    if (type === 'default') {
        return (
            <li
                style={{ color: "blue" }}
                data-notification-type={type}
                onClick={() => markAsRead(id)}
            >
                {value}
            </li>
        );
    }

    if (type === 'urgent' && html !== undefined) {
        return (
            <li
                style={{ color: "red" }}
                data-notification-type={type}
                dangerouslySetInnerHTML={html}
                onClick={() => markAsRead(id)}
            />
        );
    }

    return (
        <li
            style={{ color: "red" }}
            data-notification-type={type}
            onClick={() => markAsRead(id)}
        >
            {value}
        </li>
    );
});

export default NotificationItem;
