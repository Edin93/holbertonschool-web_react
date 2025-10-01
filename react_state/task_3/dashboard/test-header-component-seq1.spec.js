import React from 'react';
import Header from './src/Header/Header';


test('should return true if the Header component is a class component', () => {
	const props = Object.getOwnPropertyNames(Header.prototype);
	const isClassComponent = Header.prototype.__proto__ === React.Component.prototype;
	const inheritsFromReactComponent = Object.getPrototypeOf(Header.prototype) === React.Component.prototype;
	
	expect(props).toContain('constructor');
	expect(isClassComponent).toBe(true);
	expect(inheritsFromReactComponent).toBe(true);
})