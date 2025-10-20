import './Notifications.css';
import { getLatestNotification } from './utils';

export default function Notifications() {
  return (
    <div className='notification-items'>
      <p>Here is the list of notifications</p>
      <ul>
        <li data-priority='default'>New course available</li>
        <li data-priority='urgent'>New resume available</li>
        <li
          data-priority='urgent'
          dangerouslySetInnerHTML={{ __html: getLatestNotification() }}
        ></li>
      </ul>
      <button
        aria-label='Close'
        type='button'
        onClick={() => console.log('Close button has been clicked')}
        style={{
          position: 'absolute',
          right: '16px',
          top: '16px',
          cursor: 'pointer',
          maxHeight: '17px',
          background: 'transparent',
          border: 'none'
        }}
      >
        <img
          alt='close-icon'
          style={{
            position: 'relative',
            maxHeight: '12px',
            background: 'transparent',
            border: 'none',
          }}
        />
      </button>
    </div>
  );
}