import { Seq } from 'immutable';

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function printBestStudents(object) {
  let filteredStudents = Seq(object).filter(grade => grade.score > 70).map(student => {
    let editedStudent = {
      ...student,
      firstName: capitalize(student.firstName),
      lastName: capitalize(student.lastName),
    };
    return editedStudent;
  }).toJS();

  console.log(filteredStudents);
}
