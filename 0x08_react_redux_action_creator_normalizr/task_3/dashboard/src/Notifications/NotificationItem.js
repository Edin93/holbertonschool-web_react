import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

class NotificationItem extends PureComponent {
	render() {
		let {
			id,
			type,
			value,
			html,
			markAsRead
		} = this.props;

		let liStyle = (type === 'urgent') ? styles.urgentNotif : styles.defaultNotif;

		return (
			<Fragment>
				{
					html !== undefined &&
					<li
						className={css(liStyle)}
						onClick={() => markAsRead(id)}
						data-priority-type={type}
						dangerouslySetInnerHTML={html}
					/>
				}
				{
					html === undefined &&
					<li
						className={css(liStyle)}
						onClick={() => markAsRead(id)}
						data-priority-type={type}
					>
						{value}
					</li>
				}
			</Fragment>
		);
	};
};

const styles = StyleSheet.create({
	defaultNotif: {
		color: 'blue',
		padding: '10px 8px',
		'@media (max-width: 900px)': {
			width: '100%',
			fontSize: '20px',
			borderBottom: '1px solid black',
		},
	},
	urgentNotif: {
		color: 'red',
		padding: '10px 8px',
		'@media (max-width: 900px)': {
			width: '100%',
			fontSize: '20px',
			borderBottom: '1px solid black',
		},
	},
});

NotificationItem.propTypes = {
	html: PropTypes.shape({
		__html: PropTypes.string,
	}),
	type: PropTypes.string.isRequired,
	value: PropTypes.string,
	markAsRead: PropTypes.func,
};

NotificationItem.defaultProps = {
	type: "default",
};

export default NotificationItem;
