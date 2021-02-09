interface Student {
	firstName: string;
	lastName: string;
	age: number;
	location: string,
}

let studentOne: Student = {
	firstName: 'James',
	lastName: 'Joyce',
	age: 90,
	location: 'Europe'
}

let studentTwo: Student = {
	firstName: 'Jordan',
	lastName: 'Peterson',
	age: 57,
	location: 'Canada'
}

let studentsList: Student[] = [studentOne, studentTwo];
let labels: string[] = ['firstName', 'location'];

function callback() {
	let body: HTMLBodyElement = document.getElementsByTagName('body')[0];
	let table: HTMLTableElement = document.createElement('table');
	let tbody: HTMLTableSectionElement = document.createElement('tbody');
	let thead: HTMLTableSectionElement = document.createElement('thead');

	table.appendChild(thead);
	table.appendChild(tbody);

	for (let i: number = 0; i < labels.length; i++) {
		let th: HTMLTableCellElement = document.createElement('th');
		th.appendChild(document.createTextNode(`${labels[i]}`));
		thead.appendChild(th);
	}

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
	body.appendChild(table);
}

callback();

