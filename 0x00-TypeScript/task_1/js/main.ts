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

function printTeacher(firstName: string, lastName: string): any {
	if (firstName && lastName) {
		return `${firstName[0]}. ${lastName}`;
	} else {
		return ``
	}
}

interface printTeacherFunction {
	(firstName: string, lastName: string): any;
}
