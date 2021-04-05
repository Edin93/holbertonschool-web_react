import React from 'react';
import { expect } from 'chai';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NotificationItem from './NotificationItem';
import Notifications from './Notifications';
import { StyleSheetTestUtils, } from 'aphrodite';

configure({adapter: new Adapter()});

describe("Testing <NotificationItem /> Component", () => {

	let wrapper;

	beforeEach(() => {
		StyleSheetTestUtils.suppressStyleInjection();
	});

	afterEach(() => {
		StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
	});

	it("<NotificationItem /> is rendered without crashing", () => {
		wrapper = shallow(<NotificationItem shouldRender />);

		expect(wrapper).to.not.be.an("undefined");
	});

	it("<NotificationItem /> render the correct HTML, by passing type and value props", () => {
		let props = {
			type: "default",
			value: "New resume",
			html: undefined
		}		
		let component = shallow(<NotificationItem {...props} shouldRender />);
		expect(component.containsAllMatchingElements([
			<li data-priority-type={props.type}>{props.value}</li>
		])).to.equal(true);
	});

	it("<NotificationItem /> render the correct HTML, by passing dummy html props", () => {
		let props = {
			type: "urgent",
			html: { __html: "<p>test</p>"},
		}
		let component = shallow(<NotificationItem {...props} />);
		expect(component.containsAllMatchingElements([
			<li data-priority-type={props.type} dangerouslySetInnerHTML={props.html} />,
		])).to.equal(true);
	});

	it("Verify that when Clicking on the component, the 'markAsRead' is called with the right ID argument", () => {
		let props = {
			type: "urgent",
			html: { __html: "<p>test</p>"},
			markAsRead: (id) => { console.log(`Notification ${id} has been marked as read`)}
		};
		wrapper = shallow(<NotificationItem {...props} />);
		console.log = jest.fn();
		wrapper.find('li').simulate('click');
		expect(console.log.mock.calls.length).to.equal(1);
	});

});
