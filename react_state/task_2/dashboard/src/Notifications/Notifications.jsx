import React, { Component } from 'react';
import closeIcon from '../assets/close-button.png';
import NotificationItem from './NotificationItem';
import './Notifications.css';

class Notifications extends Component {
    constructor(props) {
        super(props);

    }

    shouldComponentUpdate(nextProps) {
        return (
            this.props.notifications.length !== nextProps.notifications.length ||
            this.props.displayDrawer !== nextProps.displayDrawer
        );
    }

    markAsRead = (id) => {
        console.log(`Notification ${id} has been marked as read`);
    };

    render() {
        const { notifications = [], displayDrawer = false, handleDisplayDrawer,
            handleHideDrawer } = this.props;

        return (
            <>
                <div className="notification-title"
                    onClick={() => handleDisplayDrawer()}
                    style={{ cursor: 'pointer' }}>Your notifications</div>
                {
                    displayDrawer ? (
                        <div className='notifications'>
                            {notifications.length > 0 ? (
                                <>
                                    <p>Here is the list of notifications</p>
                                    <button
                                        onClick={() => handleHideDrawer()}
                                        aria-label='Close'
                                    >
                                        <img className='close-icon' src={closeIcon} alt='close icon' />
                                    </button>
                                    <ul>
                                        {notifications.map((notification) => (
                                            <NotificationItem
                                                key={notification.id}
                                                type={notification.type}
                                                value={notification.value}
                                                html={notification.html}
                                                markAsRead={() => this.markAsRead(notification.id)}
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
