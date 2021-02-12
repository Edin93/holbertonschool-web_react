import './body.css';
import $ from 'jquery';
import _ from 'lodash';

let count = 0;

function updateCounter() {
	count += 1;
	return count;
}

$(function() {
	$('body').append('<p>Dashboard data for the students</p>');
	$('body').append('<button><span>Click here to get started<span></button>');
	$('body').append("<p id='count'></p>");

	let debouncedFunc = _.debounce(() => {
		let count = updateCounter();
		$('#count').text(`${count} clicks on the button`);
	});
	$('button').on('click', debouncedFunc);
});
