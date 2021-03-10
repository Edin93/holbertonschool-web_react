import React, { Component, Fragment } from 'react';
import closeIcon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';
import PropTypes from 'prop-types';
import NotificationItemShape from './NotificationItemShape';
import { StyleSheet, css } from 'aphrodite';

class Notifications extends Component {
	constructor(props) {
		super(props);
		this.markAsRead = this.markAsRead.bind(this);
	};

	shouldComponentUpdate(nextProps) {
		if (
			this.props.listNotifications.length < nextProps.listNotifications.length ||
			this.props.displayDrawer !== nextProps.displayDrawer
		) {
			return true;
		}
		return false;
	};

	markAsRead(id) {
		console.log(`Notification ${id} has been marked as read`);
	};

	render() {
		let {
			displayDrawer,
			listNotifications,
			handleDisplayDrawer,
			handleHideDrawer
		} = this.props;

		return (
			<div className="NotificationsComponent">
				<div
					className={`menuItem ${css(styles.menuItem)}`}
					onClick={() => handleDisplayDrawer()}
				>
					Your notifications
				</div>
				{
					displayDrawer &&
					<div className={css(styles.notifications)}>
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
								// console.log('Close button has been clicked');
								handleHideDrawer()
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
													id={notif.id}
													type={notif.type}
													value={notif.value}
													html={notif.html}
													markAsRead={this.markAsRead}
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

const opacityFrame = {
	'0%': {
		opacity: .5,
	},
	'50%': {
		opacity: .75,
	},
	'100%': {
		opacity: 1,
	},
};

const bounceFrame = {
	'0%': {
		transform: 'translateY(0)',
	},
	'50%': {
			transform: 'translateY(-10px)',
	},
	'100%': {
			transform: 'translateY(0)',
	},
};

const styles = StyleSheet.create({
	notifications: {
		border: `2px dotted var(--holberton-red)`,
		padding: '6px 12px',
		position: 'relative',
		marginTop: '12px',
		fontSize: '20px',
		position: 'absolute !important',
		top: '-2px',
		right: '0',
		left: '0',
		background: '#fff8f8',
		'@media (max-width: 900px)': {
			position: 'absolute !important',
			top: '0',
			right: '0',
			left: '0',
			background: '#fff8f8',
		},
	},
	menuItem: {
		textAlign: 'right',
		fontWeight: 'bold',
		pointer: 'cursor',
		background: '#fff8f8',
		':hover': {
			animationName: [opacityFrame, bounceFrame],
			animationDuration: '1s, .5s',
			animationIterationCount: '3',
		}
	},
	// globals: {
	// 	'*ul': {
	// 		paddingLeft: 0,
	// 	},
	// },
});

// css(styles.globals);

Notifications.propTypes = {
	displayDrawer: PropTypes.bool,
	listNotifications: PropTypes.arrayOf(NotificationItemShape),
	displayDrawer: PropTypes.bool,
	handleDisplayDrawer: PropTypes.func,
	handleHideDrawer: PropTypes.func,
};

Notifications.defaultProps = {
	displayDrawer: false,
	listNotifications: [],
	displayDrawer: false,
};

export default Notifications;
