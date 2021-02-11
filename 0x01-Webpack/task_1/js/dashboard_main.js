import $ from 'jquery';
import { _debounce } from 'lodash';

function updateCounter() {
	let btn = document.getElementsByTagName('button');
	let p = document.getElementById('count');
	let count = 0;

	btn.click(function() {
		count += 1;
		$(p).text(`${count} clicks on the button`);
	});
}

$(function() {
	$('body').append('<p>Holberton Dashboard</p>');
	$('body').append('<p>Dashboard data for the students</p>');
	$('body').append('<button>Click here to get started</button>');
	$('body').append("<p id='count'></p>");
	$('body').append('<p>Copyright - Holberton School</p>');

	$('button').on('click', _debounce(updateCounter));
});
