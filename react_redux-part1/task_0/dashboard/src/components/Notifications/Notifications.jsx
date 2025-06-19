import { memo } from 'react';
import { StyleSheet, css } from 'aphrodite';
import closeIcon from '../../assets/close-icon.png';
import NotificationItem from '../NotificationItem/NotificationItem';


const styles = StyleSheet.create({
  notificationTitle: {
    float: 'right',
    position: 'absolute',
    right: '10px',
    top: '2px',
    cursor: 'pointer',
  },
  notifications: {
    border: 'dotted',
    borderColor: 'crimson',
    marginTop: '1%',
    paddingLeft: '1rem',
    marginBottom: '1rem',
    width: '40%',
    marginLeft: '59%',
  },
  notificationsButton: {
    position: 'absolute',
    cursor: 'pointer',
    right: '5px',
    top: '20px',
    background: 'transparent',
    border: 'none',
  },
  notificationTypeDefault: {
    color: 'blue',
  },
  notificationTypeUrgent: {
    color: 'red',
  },
  menuItem: {
    textAlign: 'right',
  },
});


const Notifications = memo(function Notifications({
    displayDrawer,
    handleDisplayDrawer,
    handleHideDrawer,
    notifications = [],
    markNotificationAsRead
}) {
    return (
        <>
            <div className={css(styles.notificationTitle)} onClick={handleDisplayDrawer}>
                Your notifications
            </div>
            {displayDrawer && (
                <div className={css(styles.notifications)}>
                    {notifications.length > 0 ? (
                        <>
                            <p>Here is the list of notifications</p>
                            <button onClick={handleHideDrawer} aria-label="Close" className={css(styles.notificationsButton)}>
                                <img src={closeIcon} alt="close icon" />
                            </button>
                            <ul>
                                {notifications.map(notification => (
                                    <NotificationItem
                                        key={notification.id}
                                        id={notification.id}
                                        type={notification.type}
                                        value={notification.value}
                                        html={notification.html}
                                        markAsRead={() => markNotificationAsRead(notification.id)}
                                        className={notification.type === 'urgent' ? css(styles.notificationTypeUrgent) : css(styles.notificationTypeDefault)}
                                    />
                                ))}
                            </ul>
                        </>
                    ) : (
                        <p>No new notifications for now</p>
                    )}
                </div>
            )}
        </>
    );
});

export default Notifications;
