import React from 'react';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount } from 'enzyme';
import Footer from './Footer';
import { StyleSheetTestUtils } from 'aphrodite';
import AppContext from '../App/AppContext';

configure({adapter: new Adapter()});

describe("Testing the <Footer /> Component", () => {
	
	let wrapper;

	beforeEach(() => {
		StyleSheetTestUtils.suppressStyleInjection();
		wrapper = shallow(<Footer shouldRender />);
	});

	afterEach(() => {
		StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
	});

	it("<Footer /> is rendered without crashing", () => {
		expect(wrapper.render()).to.not.be.an('undefined');
	});

	it("<Footer /> renders at least the text: Copyright", () => {
		const wrapper = mount(<Footer />);
		expect(wrapper.find('p').at(0).html()).to.include('Copyright');
	});

	it("verify that the link is not displayed when the user is logged out within the context", () => {
		const contextVal = {
      user: {
        email: '',
        password: '',
        isLoggedIn: false,
      },
      logOut: () => this.logOut(),
		};

		const wrapper = mount(
			<AppContext.Provider value={contextVal}>
				<Footer />
			</AppContext.Provider>
		);

		expect(wrapper.find('a')).to.have.lengthOf(0);
	});

	it("verify that the link is not displayed when the user is logged out within the context", () => {
		const contextVal = {
      user: {
        email: 'cyborg13x@gmail.com',
        password: 'qe135ba',
        isLoggedIn: true,
      },
      logOut: () => this.logOut(),
		};

		const wrapper = mount(
			<AppContext.Provider value={contextVal}>
				<Footer />
			</AppContext.Provider>
		);

		expect(wrapper.find('a')).to.have.lengthOf(1);
	});

});
