import React from 'react';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import Notifications from './Notifications';
import NotificationItem from './NotificationItem';

configure({adapter: new Adapter()});

describe("Testing the <Notifications /> Component", () => {

	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<Notifications />);
	});

	it("<Notifications /> is rendered without crashing", () => {
		expect(wrapper).to.not.be.an('undefined');
	});

	it("<Notifications /> renders three list items", () => {
		expect(wrapper.find(NotificationItem)).to.have.lengthOf(3);
	});

	it("<Notifications /> renders the first <NotificationItem /> element with the right HTML", () => {
		expect(wrapper.find('ul').childAt(0).html()).to.equal('<li data-priority-type="default">New course available</li>');
	});

	it("<Notifications /> render the text 'Here is the list of notifications'", () => {
		expect(wrapper.contains(<p>Here is the list of notifications</p>)).to.equal(true);
	});

});
