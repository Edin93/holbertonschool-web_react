import React from 'react';
import chai, { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount} from 'enzyme';
import Login from './Login';
import { StyleSheetTestUtils, } from 'aphrodite';
import sinonChai from 'sinon-chai';
import  { spy, } from 'sinon';

chai.use(sinonChai);

configure({adapter: new Adapter()});

describe("Testing the <Login /> Component", () => {
	
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<Login shouldRender />);
		StyleSheetTestUtils.suppressStyleInjection();
	});

	afterEach(() => {
		StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
	});

	it("<Login /> is rendered without crashing", () => {
		expect(wrapper.render()).to.not.be.an('undefined');
	});

	it("<Login /> render 2 inputs", () => {
		expect(wrapper.find('input')).to.have.lengthOf(3);
	});

	it("<Login /> render 2 labels", () => {
		expect(wrapper.find('label')).to.have.lengthOf(2);
	});

	it("Verify that the submit button is disabled by default", () => {
		expect(wrapper.contains(<input type="submit" value="submit" disabled />)).to.equal(true);
	});

	it("Add a test to verify that after changing the value of the two inputs, the button is enabled", () => {
		// let newWrapper = shallow(<Login />);
		// let emailInput = newWrapper.find("#email").at(0);
		// let passwordInput = newWrapper.find("#password").at(0);

		let spyEmailChange = spy(Login.prototype, 'handleChangeEmail');
		let spyPWChange = spy(Login.prototype, 'handleChangePassword');

		let newWrapper = mount(<Login />);

		let emailInput = newWrapper.find('[type="email"]').at(0);
		let passwordInput = newWrapper.find('[type="password"]').at(0);

		emailInput.simulate('change', {target: {value: 'user@gmail.com'}});
		passwordInput.simulate('change', {target: {value: '123abc'}});

		expect(spyEmailChange).to.have.been.calledOnce;
		expect(spyPWChange).to.have.been.calledOnce;
	
		// newWrapper.setState({
		// 	email: emailInput.value,
		// 	password: passwordInput.value,
		// });
		// expect(newWrapper.contains(<input type="submit" value="submit" disabled />)).to.equal(true);
	});

});
