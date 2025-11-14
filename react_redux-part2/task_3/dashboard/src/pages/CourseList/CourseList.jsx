import CourseListRow from './CourseListRow/CourseListRow';
import { useDispatch, useSelector } from 'react-redux';
import WithLogging from '../../components/HOC/WithLogging';
import { selectCourse, unSelectCourse } from '../../features/courses/coursesSlice';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  courses: {
    margin: '130px auto',
    width: '90%',
    height: '33vh'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    border: '2px solid rgb(161, 161, 161)',
    ':nth-child(1n) th': {
      border: '2px solid rgb(161, 161, 161)'
    },
    ':nth-child(1n) tr': {
      border: '2px solid rgb(161, 161, 161)'
    },
    ':nth-child(1n) td': {
      border: '2px solid rgb(161, 161, 161)'
    }
  }
});

function CourseList() {
  const { courses } = useSelector((state) => state.courses);
  const dispatch = useDispatch();

  const onChangeRow = (id, checked) => {
    const action = checked ? selectCourse : unSelectCourse;
    dispatch(action(id));
  };

  return (
    <div className={css(styles.courses)}>
      {courses.length > 0 ? (
        <table id="CourseList" className={css(styles.table)}>
          <thead>
            <CourseListRow textFirstCell="Available courses" isHeader={true} />
            <CourseListRow textFirstCell="Course name" textSecondCell="Credit" isHeader={true} />
          </thead>
          <tbody>
            {courses.map((course) => (
              <CourseListRow 
                key={course.id}
                id={course.id}
                textFirstCell={course.name} 
                textSecondCell={course.credit}
                onChangeRow={onChangeRow}
                isSelected={course.isSelected || false}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <table id="CourseList" className={css(styles.table)}>
          <thead>
            <CourseListRow isHeader={true} textFirstCell="No course available yet" />
          </thead>
        </table>
      )}
    </div>
  );
}

export default WithLogging(CourseList);
