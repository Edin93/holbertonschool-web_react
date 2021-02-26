import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Header from '../Header/Header.js';
import Login from '../Login/Login.js';
import Footer from '../Footer/Footer.js';
import Notifications from '../Notifications/Notifications.js';
import CourseList from '../CourseList/CourseList';
import { getLatestNotification } from '../utils/utils';

class App extends Component {
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
            <Login />
          }
          {
            isLoggedIn === true &&
            <CourseList listCourses={listCourses} />
          }
          <Footer />
        </div>
      </Fragment>
    );  
  };
};

App.defaultProps = {
  isLoggedIn: false,
};

export default App;
