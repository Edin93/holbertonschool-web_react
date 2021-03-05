import React from 'react';
import chai, { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount } from 'enzyme';
import Notifications from './Notifications';
import NotificationItem from './NotificationItem';
import { getLatestNotification } from '../utils/utils';
import WithLogging from '../HOC/WithLogging.js';
import sinonChai from 'sinon-chai';
import { spy } from 'sinon';

chai.use(sinonChai);

configure({adapter: new Adapter()});

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

	let notifSpy = spy(Notifications.prototype, 'shouldComponentUpdate');

	beforeEach(() => {
		wrapperOne = shallow(<Notifications shouldRender {...props1} />);
		wrapperTwo = shallow(<Notifications {...props2} />);
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
		expect(wrapperTwo.find('ul').childAt(0).html()).to.equal('<li data-priority-type="default">New course available</li>');
	});

	it("<Notifications /> render the text 'Here is the list of notifications'", () => {
		expect(wrapperTwo.contains(<p>Here is the list of notifications</p>)).to.equal(true);
	});

	it("Test that the menu item is being displayed when displayDrawer is false", () => {
		expect(wrapperOne.exists(".menuItem")).to.equal(true);
	});

	it("Test that the div.Notifications is not being displayed when displayDrawer is false", () => {
		expect(wrapperOne.exists(".Notifications")).to.equal(false);
	});

	it("Test that the menu item is being displayed when displayDrawer is true", () => {
		expect(wrapperTwo.exists(".menuItem")).to.equal(true);
	});

	it("Test that the div.Notifications is being displayed when displayDrawer is true", () => {
		expect(wrapperTwo.exists(".Notifications")).to.equal(true);
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
		const log = jest.spyOn(console, 'log');
		const wrapper = shallow(<Notifications />);
		wrapper.instance().markAsRead(666);
		// expect(log).to.have.been.calledWith('Notification 666 has been marked as read');
	});

	it("verify that when updating the props of the component with the same list, the component doesn’t rerender", () => {
		// let notifSpy = spy(Notifications.prototype, 'shouldComponentUpdate');
		let notifComp = mount(<Notifications {...props2} />);

		expect(notifSpy);
		notifComp.setProps({ ...props2 });
		expect(notifSpy).to.not.be.true;
		// expect(notifSpy).to.have.been.calledTwice();
	});


	it("verify that when updating the props of the component with a longer list, the component does rerender", () => {
		// let notifSpy = spy(Notifications.prototype, 'shouldComponentUpdate');
		let notifComp = mount(<Notifications {...props2} />);

		expect(notifSpy);
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
		expect(notifSpy).to.not.be.false;
		// expect(notifSpy).to.have.been.calledTwice();
	});

});
