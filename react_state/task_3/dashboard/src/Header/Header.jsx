import { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import logo from '../assets/holberton-logo.jpg';
import newContext from '../Context/context';

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  logo: {
    height: '30vmin',
    pointerEvents: 'none'
  },
  h1: {
    color: '#e1003c',
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 'bold',
    fontSize: '2.5rem',
    margin: 0
  },
  logoutSection: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '1.2rem',
    marginLeft: 'auto',
    cursor: 'pointer'
  }
});

class Header extends Component {
  static contextType = newContext;

  render() {
    const { user, logOut } = this.context;

    return (
      <>
        <div className={css(styles.header)}>
          <img src={logo} className={css(styles.logo)} alt="holberton logo" />
          <h1 className={css(styles.h1)}>School Dashboard</h1>
        </div>
        {user.isLoggedIn && (
          <section id="logoutSection" className={css(styles.logoutSection)}>
            Welcome {user.email} (<a onClick={logOut}>logout</a>)
          </section>
        )}
      </>
    );
  }
}

export default Header;
