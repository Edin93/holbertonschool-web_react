let $ = require('jquery');

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

$(document).ready(() => {
	let body = document.getElementsByTagName('body')[0];
	let table = document.createElement('table');
	let tbody = document.createElement('tbody');

	table.appendChild(tbody);

	for (let i = 0; i < studentsList.length; i++) {
		let tr = document.createElement('tr');
		tbody.appendChild(tr);
		let values: string[] = [studentsList[i].firstName, studentsList[i].location]

		for (let j = 0; j < values.length; j++) {
			let td = document.createElement('td');
			td.appendChild(document.createTextNode(`${values[j]}`));
			tr.appendChild(td);
		}
	}
	body.appendChild(table);	
})

// let body = document.getElementsByTagName('body')[0];
// let table = document.createElement('table');
// let tbody = document.createElement('tbody');

// table.appendChild(tbody);

// for (let i = 0; i < studentsList.length; i++) {
// 	let tr = document.createElement('tr');
// 	tbody.appendChild(tr);
// 	let values: string[] = [studentsList[i].firstName, studentsList[i].location]

// 	for (let j = 0; j < values.length; j++) {
// 		let td = document.createElement('td');
// 		td.appendChild(document.createTextNode(`${values[j]}`));
// 		tr.appendChild(td);
// 	}
// }
