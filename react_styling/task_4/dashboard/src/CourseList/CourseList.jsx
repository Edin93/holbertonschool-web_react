import WithLogging from '../HOC/WithLogging';
import CourseListRow from './CourseListRow';

function CourseList({ courses = [] }) {
  return (
    <div className="courses mx-auto my-32 w-4/5">
      {courses.length > 0 ? (
        <table className="w-full border-collapse border border-gray-500">
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
        <table className="w-full border-collapse border border-gray-500">
          <thead>
            <CourseListRow isHeader={true} textFirstCell="No course available yet" />
          </thead>
        </table>
      )}
    </div>
  );
}

const CourseListWithLogging = WithLogging(CourseList);
export default CourseListWithLogging
