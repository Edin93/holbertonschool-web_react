import CourseListRow from './CourseListRow/CourseListRow';
import { useSelector } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import WithLogging from '../../components/HOC/WithLogging';


const styles = StyleSheet.create({
  courses: {
    margin: '130px auto',
    width: '90%',
    height: '33vh',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    border: '2px solid rgb(161, 161, 161)',
  },
  thtd: {
    border: '2px solid rgb(161, 161, 161)',
  },
});


function CourseList() {
    const { courses } = useSelector((state) => state.courses);
    return (
        <div className={css(styles.courses)} >
            {courses.length > 0 ? (
                <table id="CourseList" className={css(styles.table)}>
                    <thead>
                        <CourseListRow textFirstCell="Available courses" isHeader={true} style={styles.thtd}/>
                        <CourseListRow textFirstCell="Course name" textSecondCell="Credit" isHeader={true} style={styles.thtd}/>
                    </thead>
                    <tbody>
                        {courses.map((course) => (
                            <CourseListRow key={course.id} textFirstCell={course.name} textSecondCell={course.credit} style={styles.thtd}/>
                        ))}
                    </tbody>
                </table>
            ) : (
                <table id="CourseList">
                    <thead>
                        <CourseListRow isHeader={true} textFirstCell="No course available yet" style={styles.thtd}/>
                    </thead>
                </table>
            )}
        </div>
    );
}

export default WithLogging(CourseList);
