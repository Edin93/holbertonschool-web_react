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

interface StudentClassInterface {
	firstName: string;
	lastName: string;
}

interface StudentClassConstructor {
	new (firstName: string, lastName: string): StudentClass;
}

class StudentClass implements StudentClassInterface {
	firstName: string;
	lastName: string;

	constructor (firstName: string, lastName: string) {
		this.firstName = firstName;
		this.lastName = lastName;
	}

	workOnHomework(): string {
		return 'Currently working';
	}

	displayName(): string {
		return `${this.firstName}`;
	}
}
