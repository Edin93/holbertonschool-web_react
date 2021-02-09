interface Student {
	firstName: string;
	lastName: string;
	age: number;
	location: string,
}

const studentOne: Student = {
	firstName: 'James',
	lastName: 'Joyce',
	age: 90,
	location: 'Europe'
}

const studentTwo: Student = {
	firstName: 'Jordan',
	lastName: 'Peterson',
	age: 57,
	location: 'Canada'
}

const studentsList: Array<Student> = [studentOne, studentTwo];
const labels: string[] = ['firstName', 'location'];

function callback() {
	let body: HTMLBodyElement = document.getElementsByTagName('body')[0];
	let table: HTMLTableElement = document.createElement('table');
	let tbody: HTMLTableSectionElement = document.createElement('tbody');
	let thead: HTMLTableSectionElement = document.createElement('thead');

	table.appendChild(thead);

	// for (let i: number = 0; i < labels.length; i++) {
		// let th: HTMLTableCellElement = document.createElement('th');
		// th.appendChild(document.createTextNode(`${labels[i]}`));
		// thead.appendChild(th);
	// }

	thead.innerHTML = '<tr><th>firstName</th><th>location</th></tr>';

	for (let i :number = 0; i < studentsList.length; i++) {
		let tr: HTMLTableRowElement = document.createElement('tr');
		tbody.appendChild(tr);
		let values: string[] = [studentsList[i].firstName, studentsList[i].location]

		for (let j :number = 0; j < values.length; j++) {
			let td: HTMLTableCellElement = document.createElement('td');
			td.appendChild(document.createTextNode(`${values[j]}`));
			tr.appendChild(td);
		}
	}
	table.appendChild(tbody);
	body.appendChild(table);
}

callback();

