import './Notifications.css';
import closeBtn from '../assets/close-button.png';
import NotificationItem from './NotificationItem';

export default function Notifications({ notifications = [], displayDrawer = true }) {
    return (
        <>
            <div className="notification-title">Your notifications</div>
            {
                displayDrawer ? (
                    <div className='notifications'>
                        {notifications.length > 0 ? (
                            <>
                                <p>Here is the list of notifications</p>
                                <button
                                    onClick={() => console.log('Close button has been clicked')}
                                    aria-label='Close'
                                >
                                    <img className='close-icon' src={closeBtn} alt='close button' />
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
                            <p>No new notification for now</p>
                        )}
                    </div>
                ) : null
            }
        </>
    );
}

