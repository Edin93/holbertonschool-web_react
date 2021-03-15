import React from 'react';
import chai, { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import WithLogging from './WithLogging.js';
import sinonChai from 'sinon-chai';
import { spy } from 'sinon';
import Login from '../Login/Login.js';
import { StyleSheetTestUtils, } from 'aphrodite';

chai.use(sinonChai);

configure({
	adapter: new Adapter()
});

let log = spy(console, 'log');

describe("Testing the <WithLogging /> Component", () => {

	beforeEach(() => {
		StyleSheetTestUtils.suppressStyleInjection();
	});

	afterEach(() => {
		StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
	});

	it("Renders the correct children with pure html as a child", () => {
		let wrapper = mount(
			<WithLogging>
				<p>simple phrase</p>
			</WithLogging>
		);
		expect(log).to.have.been.calledWith('Component Component is mounted');
		wrapper.unmount();
		expect(log).to.have.been.calledWith('Component Component is going to unmount');
	});

	it("Renders the correct children with <Login /> Component as a child", () => {
		let wrapper = mount(
			<WithLogging>
				<Login />
			</WithLogging>
		);
		expect(log).to.have.been.calledWith('Component Login is mounted');
		wrapper.unmount();
		expect(log).to.have.been.calledWith('Component Login is going to unmount');
	});

});
