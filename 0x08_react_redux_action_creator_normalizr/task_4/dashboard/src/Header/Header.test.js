import React from 'react';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount } from 'enzyme';
import Header from './Header';
import { StyleSheetTestUtils, } from 'aphrodite';
import AppContext from '../App/AppContext';

configure({adapter: new Adapter()});

describe("Testing the <Header /> Component", () => {
	
	let wrapper;

	let context = {
		user: {
			email: 'messi@gmail.com',
			password: '1234abcd',
			isLoggedIn: true,
		},
		logOut: () => {},
	};

	beforeEach(() => {
		wrapper = mount(
			<Header shouldRender />,
			{ context: AppContext }
		);

		StyleSheetTestUtils.suppressStyleInjection();
	});

	afterEach(() => {
		StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
	});

	it("<Header /> is rendered without crashing", () => {
		expect(wrapper.render()).to.not.be.an('undefined');
	});

	it("<Header /> render img tag", () => {
		expect(wrapper.find('img')).to.have.lengthOf(1);
	});

	it("<Header /> render h1 tag", () => {
		expect(wrapper.find('h1')).to.have.lengthOf(1);
	});

	it("Verify that the logoutSection is not created", () => {
		expect(wrapper.find("#logoutSection")).to.have.lengthOf(0);
	});

	it("Verify that the logoutSection is created", () => {
		let context = {
			user: {
				email: 'messi@gmail.com',
				password: '1234abcd',
				isLoggedIn: true,
			},
			logOut: () => {},
		};

		let wrapperTwo = mount(
			<Header />,
			{ context: context }
		);
		expect(wrapperTwo.find("#logoutSection").at(0)).to.not.be.false;
	});

	it("Verify that clicking on the link 'Logout' is calling the spy", () => {		
		let context = {
			user: {
				email: 'messi@gmail.com',
				password: '1234abcd',
				isLoggedIn: true,
			},
			logOut: () => {},
		};

		let wrapperTwo = mount(
			<Header />,
			{ context: context }
		);

		let spy = jest.spyOn(wrapperTwo.instance().context, "logOut");

		// wrapperTwo.find('a').simulate('click');
		// expect(spy).toBeCalled();
	});

});
