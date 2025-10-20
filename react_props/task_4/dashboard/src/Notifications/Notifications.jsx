import './Notifications.css';
import closeIcon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';

export default function Notifications({ notifications = [] }) {
  return (
    <>
      <div className="notification-title">Your notifications</div>
      <div className='notification-items'>
        {notifications.length > 0 ? (
          <>
            <p>Here is the list of notifications</p>
            <button
              onClick={() => console.log('Close button has been clicked')}
              aria-label='Close'
            >
              <img src={closeIcon} alt='close icon' />
            </button>
            <ul>
              {notifications.map((notification, index) => (
                <NotificationItem
                  key={index}
                  type={notification.type}
                  value={notification.value}
                  html={notification.html}
                />
              ))}
            </ul>
          </>
        ) : (
        null
      )}
      </div>
    </>
  );
}
