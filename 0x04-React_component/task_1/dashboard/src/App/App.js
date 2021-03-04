import React, { Component, Fragment } from 'react';
import './App.css';
import Header from '../Header/Header.js';
import Login from '../Login/Login.js';
import Footer from '../Footer/Footer.js';
import Notifications from '../Notifications/Notifications.js';
import PropTypes from 'prop-types';

class App extends Component {
  constructor(props) {
    super(props);
    this.ctrlHEventHandler = this.ctrlHEventHandler.bind(this);
    this.handleKeyPressDown = this.handleKeyPressDown.bind(this);
  }

  ctrlHEventHandler(e) {
    let k = e.key;
    if ((e.metaKey || e.ctrlKey) && k === 'h') {
      e.preventDefault();
      alert('Logging you out');
      this.props.logout();
    }
  }

  handleKeyPressDown() {
    document.addEventListener("keydown", this.ctrlHEventHandler, false);
  };

  componentDidMount() {
    this.handleKeyPressDown();
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.ctrlHEventHandler, false);
  }

  render() {
    return (
      <Fragment>
        <Notifications />
        <div className="App">
          <Header />
          <Login />
          <Footer />
        </div>
      </Fragment>
    );
  };
}

App.propTypes = {
  logout: PropTypes.func,
};

App.defaultProps = {
  logout: () => {},
};

export default App;
