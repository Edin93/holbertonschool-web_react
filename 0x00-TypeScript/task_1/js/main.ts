interface Teacher {
	readonly firstName: string;
	readonly lastName: string;
	fullTimeEmployee: boolean;
	yearsOfExperience?: number;
	location: string;
	[propName: string]: any;
}

interface Directors extends Teacher {
	numberOfReports: number;
}

interface printTeacherFunction {
	(firstName: string, lastName: string): string;
}

export const printTeacher: printTeacherFunction = function (
	firstName: string,
	lastName: string
): string {
	return `${firstName[0]}. ${lastName}`;
}

interface StudentClassConstructor {
	new (firstName: string, lastName: string): StudentClassInterface;
}

interface StudentClassInterface {
	workOnHomework(): string;
	displayName(): string;
}

export const StudentClassConstructor = class StudentClass implements StudentClassInterface {
	firstName: string;
	lastName: string;

	constructor (firstName: string, lastName: string) {
		this.firstName = firstName;
		this.lastName = lastName;
	}

	workOnHomework() {
		return 'Currently working';
	}

	displayName() {
		return `${this.firstName}`;
	}
}

// class StudentClass implements StudentClassInterface {
// 	firstName: string;
// 	lastName: string;

// 	constructor (firstName: string, lastName: string) {
// 		this.firstName = firstName;
// 		this.lastName = lastName;
// 	}

// 	workOnHomework() {
// 		return 'Currently working';
// 	}

// 	displayName() {
// 		return `${this.firstName}`;
// 	}
// }
