const cpp = new Subjects.Cpp();
const java = new Subjects.Java();
const react = new Subjects.React();

let cTeacher = {
	firstName: 'Pablo',
	lastName: 'Escobar',
	experienceTeachingC: 10,
};

console.log('C++');
cpp.setTeacher = cTeacher;
console.log(cpp.getRequirements());
console.log(cpp.getAvailableTeacher());

console.log('Java');
java.setTeacher = cTeacher;
console.log(java.getRequirements());
console.log(java.getAvailableTeacher());

console.log('React');
react.setTeacher = cTeacher;
console.log(react.getRequirements());
console.log(react.getAvailableTeacher());

export {
	cpp,
	java,
	react,
	cTeacher,
}
