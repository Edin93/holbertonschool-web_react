import React from 'react';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import App from './App';

configure({adapter: new Adapter()});
describe("Testing the <App /> Component", () => {
	
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<App />);
	});

	it("<App /> is rendered without crashing", () => {
		expect(wrapper).to.not.be.an('undefined');
	});

	it("<App /> renders a div with the class App-header", () => {
		expect(wrapper.find('.App-header')).to.have.lengthOf(1);
	});

	it("<App /> renders a div with the class App-body", () => {
		expect(wrapper.find('.App-body')).to.have.lengthOf(1);
	});

	it("<App /> renders a div with the class App-footer", () => {
		expect(wrapper.find('.App-footer')).to.have.lengthOf(1);
	});

});
