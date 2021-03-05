import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Header from '../Header/Header.js';
import Login from '../Login/Login.js';
import Footer from '../Footer/Footer.js';
import Notifications from '../Notifications/Notifications.js';
import CourseList from '../CourseList/CourseList';
import { getLatestNotification } from '../utils/utils';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom.js';
import BodySection from '../BodySection/BodySection.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.ctrlHEventHandler = this.ctrlHEventHandler.bind(this);
  }

  ctrlHEventHandler(e) {
    let k = e.key;
    if ((e.metaKey || e.ctrlKey) && k === 'h') {
      e.preventDefault();
      alert('Logging you out');
      this.props.logOut();
    }
  };

  handleKeyPressDown() {
    document.addEventListener("keydown", this.ctrlHEventHandler, false);
  };

  componentDidMount() {
    this.handleKeyPressDown();
  };

  componentWillUnmount() {
    document.removeEventListener("keydown", this.ctrlHEventHandler, false);
  };

  render() {

    let {
      isLoggedIn,
    } = this.props;

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

    let listCourses = [
      {
        id: 1,
        name: "ES6",
        credit: 60,
      },
      {
        id: 2,
        name: "Webpack",
        credit: 20,
      },
      {
        id: 3,
        name: "React",
        credit: 40,
      },
    ];

    return (
      <Fragment>
        <div className="App">
          <div className="upperside">
            <Notifications listNotifications={listNotifications} />
            <Header />
          </div>
          {
            isLoggedIn === false &&
            <BodySectionWithMarginBottom title="Log in to continue">
              <Login />
            </BodySectionWithMarginBottom>
          }
          {
            isLoggedIn === true &&
            <BodySectionWithMarginBottom title="Course list">
              <CourseList listCourses={listCourses} />
            </BodySectionWithMarginBottom>
          }
          <BodySection title="News from the school">
            <p>
              Ipsum anim sunt qui ullamco do consequat reprehenderit
              aliqua fugiat proident amet duis.
            </p>
          </BodySection>
          <Footer />
        </div>
      </Fragment>
    );  
  };
};

App.propTypes = {
  logOut: PropTypes.func,
};

App.defaultProps = {
  isLoggedIn: false,
  logOut: () => {},
};

export default App;
