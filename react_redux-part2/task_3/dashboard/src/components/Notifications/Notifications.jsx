import { memo, useCallback, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { markNotificationAsRead } from '../../features/notifications/notificationsSlice';
import NotificationItem from '../NotificationItem/NotificationItem';
import { getFilteredNotifications } from '../../features/selectors/notificationSelector';
import closeIcon from '../../assets/close-icon.png';
import { StyleSheet, css } from "aphrodite";


const opacityKeyframes = {
  from: {
    opacity: 0.5,
  },
  to: {
    opacity: 1,
  },
};

const bounceKeyframes = {
  "0%": {
    transform: "translateY(0px)",
  },
  "50%": {
    transform: "translateY(-5px)",
  },
  "100%": {
    transform: "translateY(5px)",
  },
};

const styles = StyleSheet.create({
  notificationItems: {
    position: "relative",
    border: "3px dotted #e1003c",
    padding: "5px",
    fontFamily: "Roboto, sans-serif",
    width: "25%",
    float: "right",
    marginTop: "20px",
    maxHeight: "25vh",
    overflowY: "auto",
    opacity: 0,
    visibility: "hidden",
    transition: "opacity 0.3s ease, visibility 0.3s ease",
    "@media (max-width: 900px)": {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      border: "none",
      padding: 0,
      margin: 0,
      fontSize: "20px",
      backgroundColor: "white",
      zIndex: 1000,
    },
  },
  visible: {
    opacity: 1,
    visibility: "visible",
  },
  ul: {
    "@media (max-width: 900px)": {
      padding: 0,
    },
  },
  p: {
    margin: 0,
    "@media (max-width: 900px)": {
      fontSize: "20px",
    },
  },
  button: {
    position: "absolute",
    cursor: "pointer",
    right: "calc(0% - 480px)",
    top: "calc(0% - 480px)",
    background: "transparent",
    transform: "scale(0.012)",
    WebkitTransform: "scale(0.012)",
    MozTransform: "scale(0.012)",
    msTransform: "scale(0.012)",
    OTransform: "scale(0.012)",
  },
  menuItem: {
    float: "right",
    position: "absolute",
    right: "10px",
    top: "2px",
    backgroundColor: "#fff8f8",
    cursor: "pointer",
    ":hover": {
      animationName: [opacityKeyframes, bounceKeyframes],
      animationDuration: "1s, 0.5s",
      animationIterationCount: "3, 3",
    },
  },
  loading: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "rgb(114, 111, 111)",
    float: "right",
    position: "absolute",
    right: "20px",
    top: "25px",
  }
});


const Notifications = memo(function Notifications() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.notifications);
  const [currentFilter, setCurrentFilter] = useState('all');
  const filteredNotifications = useSelector(state => 
    getFilteredNotifications(state, currentFilter)
  );
  const DrawerRef = useRef(null);

  const handleToggleDrawer = useCallback(() => {
    if (DrawerRef.current) {
      DrawerRef.current.classList.toggle(css(styles.visible));
    }
  }, []);

  const handleSetFilterUrgent = useCallback(() => {
    setCurrentFilter(prev => prev === 'urgent' ? 'all' : 'urgent');
  }, []);

  const handleSetFilterDefault = useCallback(() => {
    setCurrentFilter(prev => prev === 'default' ? 'all' : 'default');
  }, []);
  
  const handleMarkNotificationAsRead = useCallback((id) => {
    dispatch(markNotificationAsRead(id));
  }, [dispatch]);

  return (
    <>
      <div className={css(styles.menuItem)} onClick={handleToggleDrawer}>
        Your notifications
      </div>
      {loading ? (
        <div className={css(styles.loading)}>Loading...</div>
      ) : (
        <div className={css(styles.notificationItems)} ref={DrawerRef}>
          {filteredNotifications.length > 0 ? (
            <>
              <p className={css(styles.p)}>Here is the list of notifications</p>
              <button className={css(styles.button)} onClick={handleToggleDrawer} aria-label="Close">
                <img src={closeIcon} alt="close icon" />
              </button>
              <div>
                <button className='urgent' onClick={handleSetFilterUrgent}>‼️</button>
                <button className='default' onClick={handleSetFilterDefault}>??</button>
              </div>
              <ul className={css(styles.ul)}>
                {filteredNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    id={notification.id}
                    type={notification.type}
                    value={notification.value}
                    markAsRead={handleMarkNotificationAsRead}
                  />
                ))}
              </ul>
            </>
          ) : (
            <p className={css(styles.p)}>No new notifications for now</p>
          )}
        </div>
      )}
    </>
  );
});

export default Notifications;
