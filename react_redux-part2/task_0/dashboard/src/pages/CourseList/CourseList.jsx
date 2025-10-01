import CourseListRow from './CourseListRow/CourseListRow';
import { useSelector } from 'react-redux';
import './CourseList.css'
import WithLogging from '../../components/HOC/WithLogging';

function CourseList() {
    const { courses } = useSelector((state) => state.courses);
    return (
        <div className="courses">
            {courses.length > 0 ? (
                <table id="CourseList">
                    <thead>
                        <CourseListRow textFirstCell="Available courses" isHeader={true} />
                        <CourseListRow textFirstCell="Course name" textSecondCell="Credit" isHeader={true} />
                    </thead>
                    <tbody>
                        {courses.map((course) => (
                            <CourseListRow key={course.id} textFirstCell={course.name} textSecondCell={course.credit} />
                        ))}
                    </tbody>
                </table>
            ) : (
                <table id="CourseList">
                    <thead>
                        <CourseListRow isHeader={true} textFirstCell="No course available yet" />
                    </thead>
                </table>
            )}
        </div>
    );
}

export default WithLogging(CourseList);
