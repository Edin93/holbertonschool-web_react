import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

class CourseListRow extends Component {
	render() {

		let {
			isHeader,
			textFirstCell,
			textSecondCell,
		} = this.props;

		if (isHeader === true && textSecondCell == null) {
			return (
				<tr className={css(styles.headerRowBG)} >
					<th className={css(styles.tableData)} colSpan={2}>
						{textFirstCell}
					</th>
				</tr>
			);
		} else if (isHeader === true && textSecondCell != null) {
			return (
				<tr className={css(styles.rowBG)} >
					<th className={css(styles.tableData)}>
						{textFirstCell}
					</th>
					<th className={css(styles.tableData)}>
						{textSecondCell}
					</th>
				</tr>
			);
		} else if (isHeader === false) {
			return (
				<tr className={css(styles.rowBG)} >
					<td className={css(styles.tableData)}>
						{textFirstCell}
					</td>
					<td className={css(styles.tableData)}>
						{textSecondCell}
					</td>
				</tr>
			);
		}
	}
};

const styles = StyleSheet.create({
	rowBG: {
		backgroundColor: "#f5f5f5ab",
	},
	headerRowBG: {
		backgroundColor: "#deb5b545",
	},
	tableData: {
		borderBottom: '2px solid lightgrey',
	},
});

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
