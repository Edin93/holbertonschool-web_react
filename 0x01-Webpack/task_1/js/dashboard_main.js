import $ from 'jquery';
import { debounce } from 'lodash';

let count = 0;

function updateCounter() {
	count += 1;
	return count;
}

$(function() {
	$('body').append('<p>Holberton Dashboard</p>');
	$('body').append('<p>Dashboard data for the students</p>');
	$('body').append('<button>Click here to get started</button>');
	$('body').append("<p id='count'></p>");
	$('body').append('<p>Copyright - Holberton School</p>');

	let debouncedFunc = debounce(() => {
		let count = updateCounter();
		$('#count').text(`${count} clicks on the button`);
	});
	$('button').on('click', debouncedFunc);
});

// Bind the debounce function in Lodash to the click event on the button you created previously.
