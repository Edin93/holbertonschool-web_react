import React, { PureComponent } from 'react';
import closeIcon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';
import './Notifications.css';

class Notifications extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { notifications = [], displayDrawer = false, handleDisplayDrawer, 
      handleHideDrawer, markNotificationAsRead } = this.props;

    return (
      <>
        <div className="notification-title"
             onClick={() => handleDisplayDrawer()}
             style={{ cursor: 'pointer' }}>Your notifications</div>
        {
          displayDrawer ? (
            <div className='Notifications'>
              {notifications.length > 0 ? (
                <>
                  <p>Here is the list of notifications</p>
                  <button
                     onClick={() => handleHideDrawer()}
                     aria-label='Close'
                  >
                    <img src={closeIcon} alt='close icon' />
                  </button>
                  <ul>
                    {notifications.map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        type={notification.type}
                        value={notification.value}
                        html={notification.html}
                        markAsRead={() => markNotificationAsRead(notification.id)}
                      />
                    ))}
                  </ul>
                </>
              ) : (
                <p>No new notification for now</p>
              )}
            </div>
          ) : null
        }
      </>
    );
  }
}

export default Notifications;
