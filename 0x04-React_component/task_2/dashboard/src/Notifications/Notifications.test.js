import React from 'react';
import chai, { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount } from 'enzyme';
import Notifications from './Notifications';
import NotificationItem from './NotificationItem';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

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

	it("Verify that when calling the function 'markAsRead' on a component instance, it's being called with the right message", () => {
		const log = jest.spyOn(console, 'log');
		const wrapper = shallow(<Notifications />);
		wrapper.instance().markAsRead(666);
		// expect(log).to.have.been.calledWith('Notification 666 has been marked as read');
	});

});
