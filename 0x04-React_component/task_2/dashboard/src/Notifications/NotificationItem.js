import React, { Component, Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

class NotificationItem extends Component {
	render() {
		const {
			type,
			value,
			html,
			markAsRead
		} = this.props;
		return (
			<Fragment>
				{
					html !== undefined &&
					<li
						data-priority-type={type}
						dangerouslySetInnerHTML={html}
						onClick={() => markAsRead(uuidv4())}
					/>
				}
				{
					html === undefined &&
					<li
						data-priority-type={type}
						onClick={() => markAsRead(uuidv4())}
					>
						{value}
					</li>
				}
			</Fragment>
		);
	}
}

NotificationItem.propTypes = {
	type: PropTypes.string,
	value: PropTypes.string,
	html: PropTypes.object,
	markAsRead: PropTypes.func,
};

NotificationItem.defaultProps = {
	type: 'default'
};

export default NotificationItem;
