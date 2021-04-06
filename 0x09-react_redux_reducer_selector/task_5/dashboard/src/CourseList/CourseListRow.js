import React, { Component, useState } from 'react';
import PropTypes, { symbol } from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

function CourseListRow(props) {

	const [isRowChecked, setRow] = useState(false);

	let {
		isHeader,
		textFirstCell,
		textSecondCell,
	} = props;

	if (isHeader === true && textSecondCell == null) {
		return (
			<tr className={css(styles.headerRowBG)} >
				<th className={css(styles.tableData)} colSpan={3}>
					{textFirstCell}
				</th>
			</tr>
		);
	} else if (isHeader === true && textSecondCell != null) {
		return (
			<tr className={css(styles.rowBG)}>
				<th className={css(styles.tableData)}>
					Check / Uncheck
				</th>
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
			<tr className={isRowChecked ? css(styles.rowChecked) : css(styles.rowBG)} >
				<td>
					<input type="checkbox" onClick={() => {setRow(!isRowChecked)}} checked={isRowChecked} onChange={(e) => {}} />
				</td>
				<td className={css(styles.tableData)}>
					{textFirstCell}
				</td>
				<td className={css(styles.tableData)}>
					{textSecondCell}
				</td>
			</tr>
		);
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
	rowChecked: {
		backgroundColor: '#e6e4e4',
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
