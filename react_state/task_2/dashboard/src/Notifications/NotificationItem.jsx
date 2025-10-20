import { PureComponent } from 'react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  default: {
    color: 'blue',
    '@media (max-width: 900px)': {
      width: '100%',
      borderBottom: '1px solid black',
      fontSize: '20px',
      padding: '10px 8px',
      listStyle: 'none'
    }
  },
  urgent: {
    color: 'red',
    '@media (max-width: 900px)': {
      width: '100%',
      borderBottom: '1px solid black',
      fontSize: '20px',
      padding: '10px 8px',
      listStyle: 'none'
    }
  }
});

class NotificationItem extends PureComponent {

  render() {
    const { type, html, value, markAsRead, id } = this.props;
    const itemStyle = type === 'default' ? styles.default : styles.urgent;

    if (html !== undefined) {
      return (
        <li
          className={css(itemStyle)}
          data-notification-type={type}
          dangerouslySetInnerHTML={html}
          onClick={() => markAsRead(id)}
        ></li>
      );
    } else {
      return (
        <li
          className={css(itemStyle)}
          data-notification-type={type}
          onClick={() => markAsRead(id)}
        >{value}</li>
      );
    }
  }
}

export default NotificationItem;
