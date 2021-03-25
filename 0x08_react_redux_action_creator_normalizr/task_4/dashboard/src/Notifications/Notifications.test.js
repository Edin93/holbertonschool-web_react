import React from 'react';
import chai, { assert, expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount } from 'enzyme';
import Notifications from './Notifications';
import NotificationItem from './NotificationItem';
import { getLatestNotification } from '../utils/utils';
import WithLogging from '../HOC/WithLogging.js';
import sinonChai from 'sinon-chai';
import { spy } from 'sinon';
import { StyleSheetTestUtils, } from 'aphrodite';

chai.use(sinonChai);

configure({adapter: new Adapter()});

StyleSheetTestUtils.suppressStyleInjection();

describe("Testing the <Notifications /> wrapperTwo", () => {
	let i = 0;

	let listNotifications = [
		{
			id: i++,
			type: "default",
			value: "New course available",
		},
		{
			id: i++,
			type: "urgent",
			value: "New resume available",
		},
		{
			id: i++,
			type: "urgent",
			html: {__html: getLatestNotification()},
		}
	];

	let props1 = {
		displayDrawer: false,
	};

	let props2 = {
		displayDrawer: true,
		listNotifications: listNotifications,
	};
	let wrapperOne;
	let wrapperTwo;

	beforeEach(() => {
		wrapperOne = shallow(<Notifications shouldRender {...props1} />);
		wrapperTwo = shallow(<Notifications {...props2} />);
		// StyleSheetTestUtils.suppressStyleInjection();
	});

	afterEach(() => {
		// StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
	});

	it("<Notifications /> is rendered without crashing", () => {
		expect(wrapperOne.render()).to.not.be.an('undefined');
	});

	it("<Notifications /> is rendered without crashing if listNotifications isn't passed", () => {
		expect(wrapperOne.render()).to.not.be.an('undefined');
	});

	it("<Notifications /> is rendered without crashing if listNotifications is empty", () => {
		let props1 = {
			displayDrawer: false,
			listNotifications: [],
		};

		let wrapperOne = shallow(<Notifications shouldRender {...props1} />);
		expect(wrapperOne.render()).to.not.be.an('undefined');
	});

	it("<Notifications /> renders the first <NotificationItem /> element with the right HTML", () => {

		// expect(wrapperTwo.find('ul').childAt(0).html().contains('<li data-priority-type="default">New course available</li>')).to.equal(true);
		
		expect(wrapperTwo.containsAnyMatchingElements([
			<NotificationItem
				id={listNotifications[0].id}
				type={listNotifications[0].type}
				value={listNotifications[0].value}
			/>,
		])).to.equal(true);
	});

	it("<Notifications /> render the text 'Here is the list of notifications'", () => {
		expect(wrapperTwo.contains(<p>Here is the list of notifications</p>)).to.equal(true);
	});

	it("Test that the menu item is being displayed when displayDrawer is false", () => {
		expect(wrapperOne.exists()).to.equal(true);
	});

	it("Test that the div.Notifications is not being displayed when displayDrawer is false", () => {
		expect(wrapperOne.exists(".Notifications")).to.equal(false);
	});

	it("Test that the menu item is being displayed when displayDrawer is true", () => {
		expect(wrapperTwo.exists()).to.equal(true);
	});

	it("Test that the div.Notifications is being displayed when displayDrawer is true", () => {
		expect(wrapperTwo.find('div')).to.have.lengthOf(3);
	});

	it("<Notifications /> renders three list items", () => {
		expect(wrapperTwo.render()).to.not.be.an('undefined');
		expect(wrapperTwo.find(NotificationItem)).to.have.lengthOf(3);
	});

	it("Tests that when listNotifications is empty the message Here is the list of notifications is not displayed, but No new notification for now is", () => {
		let props1 = {
			displayDrawer: true,
			listNotifications: [],
		};
		let wrapperOne = shallow(<Notifications shouldRender {...props1} />);
		expect(wrapperOne.contains(<p>No new notification for now</p>)).to.equal(true);
	});

	it("Verify that when calling the function 'markAsRead' on a component instance, it's being called with the right message", () => {
		const wrapper = mount(<Notifications />);
		wrapper.props().markNotificationAsRead(666);
	});

	it("verify that when updating the props of the component with a longer list, the component does rerender", () => {
		let notifComp = mount(<Notifications {...props2} />);

		notifComp.setProps({
			displayDrawer: true,
			listNotifications: [
				...props2.listNotifications,
				{
					id: 8967,
					type: "default",
					value: "New notif for test",
				},
			]
		});

		expect(notifComp.props().listNotifications).to.have.lengthOf(4);
	});

	it("Verify that clicking on the menu item calls handleDisplayDrawer", () => {
		const mockDisplay = jest.fn(() => {});
		const mockHide = jest.fn(() => {});

		let props = {
			...props2,
			displayDrawer: false,
			handleDisplayDrawer: mockDisplay,
			handleHideDrawer: mockHide,
		};

		let wrapper = shallow(<Notifications {...props} />);

		wrapper.find('.menuItem').at(0).simulate('click');

		expect(mockDisplay.mock.calls.length).to.equal(1);
	});

	it("Verify that clicking on the button calls handleHideDrawer", () => {
		const mockDisplay = jest.fn(() => {});
		const mockHide = jest.fn(() => {});

		let props = {
			...props2,
			displayDrawer: true,
			handleDisplayDrawer: mockDisplay,
			handleHideDrawer: mockHide,
		};

		let wrapper = shallow(<Notifications {...props} />);

		wrapper.find('button').at(0).simulate('click');

		expect(mockHide.mock.calls.length).to.equal(1);
	});

});
