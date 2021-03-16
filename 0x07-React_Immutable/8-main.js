import printBestStudents from './8-seq';

const grades = {
  1: {
    score: 99,
    firstName: 'guillaume',
    lastName: 'salva',
  }
};

console.log('printBestStudents: ');
printBestStudents(grades);

// import { Seq } from 'immutable';

// const capitalize = (str) => {
//   return str.charAt(0).toUpperCase() + str.slice(1);
// }

// export default function printBestStudents(object) {
//   let filteredStudents = Seq(object).filter(grade => grade.score > 70).map(student => {
//     let editedStudent = {
//       ...student,
//       firstName: capitalize(student.firstName),
//       lastName: capitalize(student.lastName),
//     };
//     return editedStudent;
//   }).toJS();

//   console.log(filteredStudents);
// }
