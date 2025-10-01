import { memo, useCallback, useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { markNotificationAsRead } from '../../features/notifications/notificationsSlice';
import NotificationItem from '../NotificationItem/NotificationItem';
import './Notifications.css';
import closeIcon from '../../assets/close-icon.png';


const Notifications = memo(function Notifications () {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.notifications);

  console.log('Get re render once again!')

  const DrawerRef = useRef(null);

  const handleToggleDrawer = useCallback(() => {
    DrawerRef.current.classList.toggle('visible');
  }, []);

  const handleMarkNotificationAsRead = useCallback((id) => {
    dispatch(markNotificationAsRead(id));
  }, [dispatch]);

  return (
    <>
      <div className="notification-title" onClick={handleToggleDrawer}>
        Your notifications
      </div>
      <div className="Notifications visible" ref={DrawerRef} >
        {notifications.length > 0 ? (
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