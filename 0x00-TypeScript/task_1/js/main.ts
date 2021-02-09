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

let printTeacher: (firstName: string, lastName: string) => string = function (
	firstName: string,
	lastName: string
): string {
	return `${firstName[0]}. ${lastName}`;
}

interface printTeacherFunction {
	(firstName: string, lastName: string): string;
}
