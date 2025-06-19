import { StyleSheet, css } from 'aphrodite';
import { getCurrentYear, getFooterCopy } from '../../utils/utils';

export default function Footer({ user }) {
  return (
    <div className={css(styles.footer)}>
      <p>Copyright {getCurrentYear()} - {getFooterCopy(true)}</p>
      {user.isLoggedIn && <a href="#">Contact us</a>}
    </div>
  );
}

const styles = StyleSheet.create({
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontStyle: 'italic',
    fontFamily: 'sans-serif',
  },
});