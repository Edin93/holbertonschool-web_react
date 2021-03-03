import React, { Component, Fragment } from 'react';
import './App.css';
import Header from '../Header/Header.js';
import Login from '../Login/Login.js';
import Footer from '../Footer/Footer.js';
import Notifications from '../Notifications/Notifications.js';

class App extends Component {
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

export default App;
