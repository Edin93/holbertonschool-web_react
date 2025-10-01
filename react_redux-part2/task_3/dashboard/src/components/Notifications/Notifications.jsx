import { memo, useState, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { markNotificationAsRead } from '../../features/notifications/notificationsSlice';
import { getFilteredNotifications } from '../../features/selectors/notificationSelector';
import NotificationItem from '../NotificationItem/NotificationItem';
import './Notifications.css';
import closeIcon from '../../assets/close-icon.png';

const Notifications = memo(function Notifications() {
    const dispatch = useDispatch();
    const { notifications, loading } = useSelector((state) => state.notifications);
    const notificationsContainerRef = useRef(null);

    const [currentFilter, setCurrentFilter] = useState('all');

    const filteredNotifications = useSelector((state) =>
        getFilteredNotifications(state, currentFilter)
    );

    const handleToggleDrawer = () => {
        notificationsContainerRef.current.classList.toggle('visible');
    };

    const handleMarkNotificationAsRead = (id) => {
        dispatch(markNotificationAsRead(id));
    };

    const handleSetFilterUrgent = useCallback(() => {
        setCurrentFilter(prev => prev === 'urgent' ? 'all' : 'urgent');
      }, []);
    
      const handleSetFilterDefault = useCallback(() => {
        setCurrentFilter(prev => prev === 'default' ? 'all' : 'default');
      }, []);

    return (
        <>
            <div className="notification-title" onClick={handleToggleDrawer}>
                Your notifications
            </div>
            <div className="Notifications visible" ref={notificationsContainerRef}>
                {loading ? (
                    <p>Loading...</p>
                ) : filteredNotifications.length > 0 ? (
                    <>
                        <p>Here is the list of notifications</p>
                        <button onClick={handleToggleDrawer} aria-label="Close">
                            <img src={closeIcon} alt="close icon" />
                        </button>
                        <div className="filter-buttons">
                            <button onClick={handleSetFilterUrgent} aria-label="Show Urgent Notifications">
                                ‼️
                            </button>
                            <button onClick={handleSetFilterDefault} aria-label="Show Default Notifications">
                                ?
                            </button>
                        </div>

                        <ul>
                            {filteredNotifications.map((notification) => (
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
