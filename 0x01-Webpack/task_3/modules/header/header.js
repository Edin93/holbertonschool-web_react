import './header.css';
import $ from 'jquery';

$(function() {
	$('body').append("<div id='logo'></div>");
	$('body').append('<h1>Holberton Dashboard</h1>');
	console.log('Init header');
});
