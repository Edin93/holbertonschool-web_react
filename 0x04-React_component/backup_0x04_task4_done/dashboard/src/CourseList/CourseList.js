import React, { Component, } from 'react';
import './CourseList.css';
import CourseListRow from './CourseListRow';
import PropTypes from 'prop-types';
import CourseShape from './CourseShape';

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
				<table id="CourseList">
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

CourseList.propTypes = {
	listCourses: PropTypes.arrayOf(CourseShape),
};

CourseList.defaultProps = {
	listCourses: [],
};

export default CourseList;
