import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header.js';
import Login from '../Login/Login.js';
import Footer from '../Footer/Footer.js';
import Notifications from '../Notifications/Notifications.js';
import CourseList from '../CourseList/CourseList';
import { getLatestNotification } from '../utils/utils';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom.js';
import BodySection from '../BodySection/BodySection.js';
import WithLogging from '../HOC/WithLogging.js';
import { StyleSheet, css } from 'aphrodite';
import AppContext from './AppContext';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
          html: {__html: getLatestNotification()},
        }
      ],
    };
    this.ctrlHEventHandler = this.ctrlHEventHandler.bind(this);
    this.handleDisplayDrawer = this.handleDisplayDrawer.bind(this);
    this.handleHideDrawer = this.handleHideDrawer.bind(this);
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.markNotificationAsRead = this.markNotificationAsRead.bind(this);
  };

  handleDisplayDrawer() {
    this.setState({
      displayDrawer: true,
    });
  };

  logIn(email, password) {
    this.setState({
      user: {
        email: email,
        password: password,
        isLoggedIn: true,
      },
    });
  };

  logOut() {
    let self = this;
    self.setState({
      user: {
        email: '',
        password: '',
        isLoggedIn: false,
      },
    });
  };

  handleHideDrawer() {
    this.setState({
      displayDrawer: false,
    });
  };

  ctrlHEventHandler(e) {
    let k = e.key;
    if ((e.metaKey || e.ctrlKey) && k === 'h') {
      e.preventDefault();
      alert('Logging you out');
      this.logOut();
    }
  };

  handleKeyPressDown() {
    document.addEventListener("keydown", this.ctrlHEventHandler, false);
  };

  markNotificationAsRead(id) {
    let updatedNotifications = this.state.listNotifications.filter((notif) => {
      return notif.id !== id;
    });

    this.setState({
      listNotifications: updatedNotifications,
    });
  };

  componentDidMount() {
    this.handleKeyPressDown();
  };

  componentWillUnmount() {
    document.removeEventListener("keydown", this.ctrlHEventHandler, false);
  };

  render() {

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

    let {
      displayDrawer,
      user,
      logOut,
      listNotifications,
    } = this.state;

    return (
      <AppContext.Provider value={{user, logOut}} >
        <div className={css(styles.app)}>
          <div className={css(styles.upperside)}>
            <Notifications
              listNotifications={listNotifications}
              displayDrawer={displayDrawer}
              handleDisplayDrawer={this.handleDisplayDrawer}
              handleHideDrawer={this.handleHideDrawer}
              markNotificationAsRead={this.markNotificationAsRead}
            />
            <Header />
          </div>
          {
            user.isLoggedIn === false &&
            <BodySectionWithMarginBottom title="Log in to continue">
              <Login logIn={this.logIn} />
            </BodySectionWithMarginBottom>
          }
          {
            user.isLoggedIn === true &&
            <BodySectionWithMarginBottom title="Course list">
              <CourseList listCourses={listCourses} />
            </BodySectionWithMarginBottom>
          }
          <BodySection title="News from the school">
            <p>
              Labore ut consequat esse nostrud aute exercitation occaecat consequat ad cillum enim et est ex.
               Qui proident veniam in aute magna occaecat.
               Esse duis proident aliqua proident eu magna aliqua est exercitation.
               Cupidatat ex eiusmod et commodo laborum veniam deserunt ad est excepteur cillum laborum.
            </p>
          </BodySection>
          <Footer />
        </div>
      </AppContext.Provider>
    );
  };
};

const styles = StyleSheet.create({
  app: {
    position: 'relative',
    minHeight: '100vh',
  },
  upperside: {
    display: "flex",
    flexDirection: "row-reverse",
    width: "100%",
    borderBottom: `3px solid var(--holberton-red)`,
    justifyContent: "space-between",
  }
});

export default App;
