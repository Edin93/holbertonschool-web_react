import "../Notifications/Notifications.css";
import { getLatestNotification } from "../utils/utils";
import closeBtn from "../assets/close-button.png";
import '../Notifications/Notifications.css'

function Notifications() {
    return (
        <>
            <div className="notifications">
                <button
                    style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                    aria-label="Close"
                    onClick={() => console.log('Close button has been clicked')}
                >
                    <img src={closeBtn} alt="close" style={{ width: '15px', height: '15px' }} />
                </button>
                <p>Here is the list of notifications</p>
                <ul>
                    <li data-priority="default" >New course available</li>
                    <li data-priority="urgent" >New resume available</li>
                    <li dangerouslySetInnerHTML={{ __html: getLatestNotification() }}></li>
                </ul>
            </div>
        </>
    )
}

export default Notifications
