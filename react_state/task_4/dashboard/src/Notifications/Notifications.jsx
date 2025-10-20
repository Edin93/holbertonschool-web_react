import { PureComponent } from 'react';
import { StyleSheet, css } from 'aphrodite';
import closeIcon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';

const opacityKeyframes = {
  'from': {
    opacity: 0.5
  },
  'to': {
    opacity: 1
  }
};

const bounceKeyframes = {
  '0%': {
    transform: 'translateY(0px)'
  },
  '50%': {
    transform: 'translateY(-5px)'
  },
  '100%': {
    transform: 'translateY(5px)'
  }
};

const styles = StyleSheet.create({
  notificationItems: {
    position: 'relative',
    border: '3px dotted #e1003c',
    padding: '5px',
    fontFamily: 'Roboto, sans-serif',
    width: '25%',
    float: 'right',
    marginTop: '20px',
    '@media (max-width: 900px)': {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      border: 'none',
      padding: 0,
      margin: 0,
      fontSize: '20px',
      backgroundColor: 'white',
      zIndex: 1000
    }
  },
  ul: {
    '@media (max-width: 900px)': {
      padding: 0
    }
  },
  p: {
    margin: 0,
    '@media (max-width: 900px)': {
      fontSize: '20px'
    }
  },
  button: {
    position: 'absolute',
    cursor: 'pointer',
    right: 'calc(0% - 480px)',
    top: 'calc(0% - 480px)',
    background: 'transparent',
    transform: 'scale(0.012)',
    WebkitTransform: 'scale(0.012)',
    MozTransform: 'scale(0.012)',
    msTransform: 'scale(0.012)',
    OTransform: 'scale(0.012)'
  },
  menuItem: {
    float: 'right',
    position: 'absolute',
    right: '10px',
    top: '-5px',
    backgroundColor: '#fff8f8',
    cursor: 'pointer',
    ':hover': {
      animationName: [opacityKeyframes, bounceKeyframes],
      animationDuration: '1s, 0.5s',
      animationIterationCount: '3, 3'
    }
  }
});

class Notifications extends PureComponent {
  render() {
    const { notifications = [], displayDrawer, handleDisplayDrawer, handleHideDrawer, markNotificationAsRead } = this.props;

    return (
      <>
        <div className={css(styles.menuItem)} onClick={() => handleDisplayDrawer()}>
          Your notifications
        </div>
        {
          displayDrawer ? (
            <div className={css(styles.notificationItems)}>
              {notifications.length > 0 ? (
                <>
                  <p className={css(styles.p)}>Here is the list of notifications</p>
                  <button
                    onClick={() => handleHideDrawer()}
                    aria-label='Close'
                    className={css(styles.button)}
                  >
                    <img src={closeIcon} alt='close icon' />
                  </button>
                  <ul className={css(styles.ul)}>
                    {notifications.map((notification) => (
                      <NotificationItem
                        id={notification.id}
                        key={notification.id}
                        type={notification.type}
                        value={notification.value}
                        html={notification.html}
                        markAsRead={markNotificationAsRead}
                      />
                    ))}
                  </ul>
                </>
              ) : (
                <p className={css(styles.p)}>No new notification for now</p>
              )}
            </div>
          ) :
          ([])
        }
      </>
    );
  }
}

export default Notifications
