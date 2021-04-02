import React from 'react';
import chai, { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount } from 'enzyme';
import App from './App';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import Notifications from '../Notifications/Notifications';
import CourseList from '../CourseList/CourseList';
import { StyleSheetTestUtils, } from 'aphrodite';
import sinonChai from 'sinon-chai';
import { spy } from 'sinon';
import AppContext from './AppContext';

chai.use(sinonChai);

configure({adapter: new Adapter()});

describe("Testing the <App /> Component", () => {
	
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<App />);
		StyleSheetTestUtils.suppressStyleInjection();
	});

	afterEach(() => {
		StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
	});

	it("<App /> is rendered without crashing", () => {
		expect(wrapper).to.not.be.an('undefined');
	});

	it("<App /> contains the <Notifications /> Component", () => {
		expect(wrapper.find(Notifications)).to.have.lengthOf(1);
	});

	it("<App /> contains the <Header /> Component", () => {
		expect(wrapper.contains(<Header />)).to.equal(true);
	});

	it("<App /> contains the <Login /> Component", () => {
		expect(wrapper.contains(<Login logIn={wrapper.instance().logIn} />)).to.equal(true);
	});

	it("<App /> contains the <Footer /> Component", () => {
		expect(wrapper.contains(<Footer />)).to.equal(true);
	});

	it("<App /> doesn't contain <CourseList />", () => {
		expect(wrapper.find(CourseList)).to.have.lengthOf(0);
	});

});

describe("Testing the <App /> when isLoggedIn is true", () => {

	let props = {
		isLoggedIn: true,
	};

	let component = shallow(<App {...props} />);

	component.setState({
		user: {
			email: '',
			password: '',
			isLoggedIn: true,
		},
	});

	expect(component.contains(<Login />)).to.equal(false);
	expect(component.find(CourseList)).to.have.lengthOf(1);
});

describe('Verify if logOut is correctly called by checking the state', () => {
	const appComp = mount(<App />);
	appComp.setState({
		user: {
			email: 'hello@gmail.com',
			password: '666satan',
			isLoggedIn: true,
		},
		logOut: () => {},
	});
	appComp.instance().logOut();
	expect(appComp.state().user.isLoggedIn).to.equal(false);
});

describe("Verify <App /> on state change", () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<App />);
		StyleSheetTestUtils.suppressStyleInjection();
	});

	afterEach(() => {
		StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
	});

	it("verify that the default state for displayDrawer is false & after calling handleDisplayDrawer, the state.displayDrawer should now be true", () => {
		expect(wrapper.state('displayDrawer')).to.equal(false);
		wrapper.instance().handleDisplayDrawer();
		expect(wrapper.state('displayDrawer')).to.equal(true);
	});

	it("verify that after calling handleHideDrawer, the state.displayDrawer is updated to be false", () => {
		wrapper.instance().handleHideDrawer();
		expect(wrapper.state('displayDrawer')).to.equal(false);
	});

	it("verify that the logIn function updates the state correctly", () => {
		const appComp = mount(<App />);
		appComp.setState({
			user: {
				email: '',
				password: '',
				isLoggedIn: false,
			},
			logOut: () => {},
		});
		appComp.instance().logIn('kyle@gmail.com', 'kyle123');
		expect(appComp.state().user.isLoggedIn).to.equal(true);
	});
	
	it("Verify that the logOut function updates the state correctly", () => {
		const appComp = mount(<App />);
		appComp.setState({
			user: {
				email: 'hello@gmail.com',
				password: '666satan',
				isLoggedIn: true,
			},
			logOut: () => {},
		});
		appComp.instance().logOut();
		expect(appComp.state().user.isLoggedIn).to.equal(false);		
	});

	it("Verify that markNotificationAsRead works as intended", () => {
		let state = {
			displayDrawer: false,
      user: {
        email: '',
        password: '',
        isLoggedIn: false,
      },
      logOut: () => this.logOut(),
      listNotifications: [
        {
          id: 0,
          type: "default",
          value: "New course available",
        },
        {
          id: 1,
          type: "urgent",
          value: "New resume available",
        },
        {
          id: 2,
          type: "urgent",
          value: "dumb text",
        }
      ],
		};

		const wrapper = mount(
			<AppContext.Provider>
				<App />
			</AppContext.Provider>
		);

		wrapper.setState({...state});

		wrapper.instance().markNotificationAsRead(0);
		expect(wrapper.state().listNotifications).to.have.lengthOf(2);

	});

});
