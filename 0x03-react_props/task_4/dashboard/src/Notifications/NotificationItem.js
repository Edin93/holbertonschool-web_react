import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class NotificationItem extends Component {
	render() {
		const {
			type,
			value,
			html
		} = this.props;
		return (
			<Fragment>
				{
					html !== undefined &&
					<li
						data-priority-type={type}
						dangerouslySetInnerHTML={html}
					/>
				}
				{
					html === undefined &&
					<li
						data-priority-type={type}
					>
						{value}
					</li>
				}
			</Fragment>
		);
	};
};

NotificationItem.propTypes = {
	html: PropTypes.shape({
		__html: PropTypes.string,
	}),
	type: PropTypes.string.isRequired,
	value: PropTypes.string,
};

NotificationItem.defaultProps = {
	type: "default",
}

export default NotificationItem;
