import React, { Component, Fragment } from 'react';
import './Notifications.css';
import closeIcon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';
import PropTypes from 'prop-types';
import NotificationItemShape from './NotificationItemShape';

class Notifications extends Component {
	render() {
		let {
			displayDrawer,
			listNotifications,
		} = this.props;

		return (
			<div className="NotificationsComponent">
				<div className="menuItem">
					Your notifications
				</div>
				{
					displayDrawer &&
					<div className="Notifications">
						<button
							style={{
								color: '#3a3a3a',
								fontWeight: 'bold',
								background: 'none',
								border: 'none',
								fontSize: '15px',
								position: 'absolute',
								right: '3px',
								top: '3px',
								cursor: 'pointer',
								outline: 'none',
							}}
							aria-label="Close"
							onClick={(e) => {
								console.log('Close button has been clicked');
							}}
						>
							<img
								src={closeIcon}
								alt="close icon"
							/>
						</button>
						{
							listNotifications.length === 0 &&
							<p>No new notification for now</p>
						}
						{
							listNotifications.length > 0 &&
							<Fragment>
								<p>
									Here is the list of notifications
								</p>
								<ul>
									{	
										listNotifications.map((notif) => {
											return (
												<NotificationItem
													key={notif.id}
													type={notif.type}
													value={notif.value}
													html={notif.html}
												/>
											)
										})
									}
								</ul>
							</Fragment>
						}
					</div>
				}
			</div>
		);
	};
};

Notifications.propTypes = {
	displayDrawer: PropTypes.bool,
	listNotifications: PropTypes.arrayOf(NotificationItemShape),
};

Notifications.defaultProps = {
	displayDrawer: false,
	listNotifications: [],
};

export default Notifications;
