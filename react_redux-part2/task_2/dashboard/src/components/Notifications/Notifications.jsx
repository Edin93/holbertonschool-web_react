// Notifications.jsx

import { memo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { markNotificationAsRead } from '../../features/notifications/notificationsSlice';
import NotificationItem from '../NotificationItem/NotificationItem';
import './Notifications.css';
import closeIcon from '../../assets/close-icon.png';

const Notifications = memo(function Notifications() {
    const dispatch = useDispatch();
    const { notifications, loading } = useSelector((state) => state.notifications);
    const notificationsContainerRef = useRef(null);

    const handleToggleDrawer = () => {
        notificationsContainerRef.current.classList.toggle('visible');
    };

    const handleMarkNotificationAsRead = (id) => {
        dispatch(markNotificationAsRead(id));
    };

    return (
        <>
            <div className="notification-title" onClick={handleToggleDrawer}>
                Your notifications
            </div>
            <div className="Notifications" ref={notificationsContainerRef}>
                {loading ? (
                    <p>Loading...</p>
                ) : notifications.length > 0 ? (
                    <>
                        <p>Here is the list of notifications</p>
                        <button onClick={handleToggleDrawer} aria-label="Close">
                            <img src={closeIcon} alt="close icon" />
                        </button>
                        <ul>
                            {notifications.map((notification) => (
                                <NotificationItem
                                    key={notification.id}
                                    id={notification.id}
                                    type={notification.type}
                                    value={notification.value}
                                    html={notification.html}
                                    markAsRead={handleMarkNotificationAsRead}
                                />
                            ))}
                        </ul>
                    </>
                ) : (
                    <p>No new notifications for now</p>
                )}
            </div>
        </>
    );
});

export default Notifications;
