import { StyleSheet, css } from 'aphrodite';
import logo from '../../assets/holberton-logo.jpg';

const styles = StyleSheet.create({
  header: {
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: '20px',
    fontFamily: 'sans-serif',
  },
  title: {
    color: '#e1003c',
    fontFamily: "'Roboto', sans-serif",
    fontWeight: 'bold',
    fontSize: '2.5rem',
    margin: 0,
  },
  logo: {
    height: '30vmin',
    pointerEvents: 'none',
  },
  logoutSection: {
    marginLeft: 'auto',
    fontSize: '1rem',
  },
});

export default function Header({ user, logOut }) {
  return (
    <div className={css(styles.header)}>
      <img src={logo} className={css(styles.logo)} alt="holberton logo" />
      <h1 className={css(styles.title)}>School Dashboard</h1>
      {user.isLoggedIn && (
        <div className={css(styles.logoutSection)} id="logoutSection">
          Welcome <b>{user.email}</b>{' '}
          <a href="#" onClick={logOut}>
            (logout)
          </a>
        </div>
      )}
    </div>
  );
}
