import { useSelector } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import { getCurrentYear, getFooterCopy } from '../../utils/utils';

export default function Footer({ user }) {
   const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <div className={css(styles.footer)}>
      <p>Copyright {getCurrentYear()} - {getFooterCopy(true)}</p>
      {isLoggedIn && <a href="#">Contact us</a>}
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