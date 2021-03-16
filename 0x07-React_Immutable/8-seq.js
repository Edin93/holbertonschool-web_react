import { Seq } from 'immutable';

export default function printBestStudents(object) {
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  let filteredStudents = Seq(object)
    .filter((grade) => grade.score > 70)
    .map((student) => {
      const editedStudent = {
        ...student,
        firstName: capitalize(student.firstName),
        lastName: capitalize(student.lastName),
      };
      return editedStudent;
    });

  filteredStudents = filteredStudents.toJS();

  console.log(filteredStudents);
}
