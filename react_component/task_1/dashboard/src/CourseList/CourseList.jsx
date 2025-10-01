import CourseListRow from './CourseListRow';
import './CourseList.css'

export default function CourseList({ courses = [] }) {
    return (
        <div className='courses'>
            {
                courses.length > 0 ?
                    (
                        <table id='CourseList'>
                            <thead>
                                <CourseListRow
                                    textFirstCell="Available courses"
                                    isHeader={true}
                                />
                                <CourseListRow
                                    textFirstCell="Course name"
                                    textSecondCell="Credit"
                                    isHeader={true}
                                />
                            </thead>
                            <tbody>
                                {
                                    courses.map(course => (
                                        <CourseListRow
                                            key={course.id}
                                            textFirstCell={course.name}
                                            textSecondCell={course.credit}
                                        />
                                    ))
                                }
                            </tbody>
                        </table>
                    ) : (
                        <table id='CourseList'>
                            <thead>
                                <CourseListRow
                                    isHeader={true}
                                    textFirstCell="No course available yet"
                                />
                            </thead>
                        </table>
                    )
            }
        </div>
    );
}
