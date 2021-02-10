interface DirectorInterface {
	workFromHome(): string;
	getCoffeeBreak(): string;
	workDirectorTasks(): string;
}

interface TeacherInterface {
	workFromHome(): string;
	getCoffeeBreak(): string;
	workTeacherTasks(): string;
}

class Director implements DirectorInterface {
	workFromHome() {
		return `Working from home`;
	}

	getCoffeeBreak() {
		return `Getting a coffee break`;
	}

	workDirectorTasks() {
		return `Getting to director tasks`;
	}
}

class Teacher implements TeacherInterface {
	workFromHome() {
		return `Cannot work from home`;
	}

	getCoffeeBreak() {
		return `Cannot have a break`;
	}

	workTeacherTasks() {
		return `Getting to work`;
	}
}

function createEmployee(salary: number): Director | Teacher {
	if (typeof(salary) === 'number' && salary < 500) {
		return new Teacher();
	}
	return new Director();
}

function isDirector(employee: any): boolean {
	return (employee instanceof Director);
}

function executeWork(employee: any): void {
	if (employee instanceof Director) {
		employee.workDirectorTasks();
	} else if (employee instanceof Teacher) {
		employee.workTeacherTasks();
	}
}

export {
	Director,
	Teacher,
	createEmployee,
	isDirector,
	executeWork,
}
