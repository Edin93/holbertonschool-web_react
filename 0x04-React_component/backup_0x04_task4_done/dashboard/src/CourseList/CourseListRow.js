import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CourseListRow extends Component {
	render() {

		let {
			isHeader,
			textFirstCell,
			textSecondCell,
		} = this.props;

		if (isHeader === true && textSecondCell == null) {
			return (
				<tr>
					<th colSpan={2}>
						{textFirstCell}
					</th>
				</tr>
			);
		} else if (isHeader === true && textSecondCell != null) {
			return (
				<tr>
					<th>
						{textFirstCell}
					</th>
					<th>
						{textSecondCell}
					</th>
				</tr>
			);
		} else if (isHeader === false) {
			return (
				<tr>
					<td>
						{textFirstCell}
					</td>
					<td>
						{textSecondCell}
					</td>
				</tr>
			);
		}
	}
};

CourseListRow.propTypes = {
	isHeader: PropTypes.bool,
	textFirstCell: PropTypes.string.isRequired,
	textSecondCell: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
};

CourseListRow.defaultProps = {
	isHeader: false,
	textSecondCell: null,
};

export default CourseListRow;
