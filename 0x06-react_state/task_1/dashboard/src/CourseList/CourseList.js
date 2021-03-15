import React, { Component, } from 'react';
import CourseListRow from './CourseListRow';
import PropTypes from 'prop-types';
import CourseShape from './CourseShape';
import { StyleSheet, css } from 'aphrodite';

class CourseList extends Component {
	render() {
		let {
			listCourses,
		} = this.props;

		if (!listCourses) {
			return (
				<div>
					No course available yet
				</div>
			);
		} else {
			return (
				<table className={css(styles.table)}>
					<thead>
						<CourseListRow textFirstCell="Available courses" isHeader={true} />
						<CourseListRow textFirstCell="Course name" textSecondCell="Credit" />
					</thead>
					<tbody>
						{
							listCourses.map(course => {
								return (
									<CourseListRow
										key={course.id}
										textFirstCell={course.name}
										textSecondCell={course.credit}
										isHeader={false}
									/>
								)
							})
						}
					</tbody>
				</table>
			);
		}
	};
};

const styles = StyleSheet.create({
	table: {
		margin: '20px auto',
		width: '85%',
		border: '1px solid lightgrey',
	},
});

CourseList.propTypes = {
	listCourses: PropTypes.arrayOf(CourseShape),
};

CourseList.defaultProps = {
	listCourses: [],
};

export default CourseList;
