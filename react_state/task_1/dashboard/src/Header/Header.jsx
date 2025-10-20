import { StyleSheet, css } from 'aphrodite';
import logo from '../assets/holberton-logo.jpg';

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
  }
});

function Header() {
  return (
    <div className={css(styles.header)}>
      <img src={logo} className={css(styles.logo)} alt="holberton logo" />
      <h1 className={css(styles.h1)}>School Dashboard</h1>
    </div>
  )
}

export default Header;
