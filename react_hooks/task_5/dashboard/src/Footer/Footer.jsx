import { useContext } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { getCurrentYear, getFooterCopy } from '../utils/utils';
import newContext from '../Context/context';

const styles = StyleSheet.create({
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTop: '5px red solid',
    gap: '10px'
  },
  p: {
    fontFamily: 'Roboto, sans-serif',
    fontStyle: 'italic',
    fontSize: '1.3rem',
    padding: '0 3px',
    margin: 0
  }
});

export default function Footer() {
  const { user } = useContext(newContext);
  
  return (
    <div className={css(styles.footer)}>
      <p className={css(styles.p)}>Copyright {getCurrentYear()} - {getFooterCopy(true)}</p>
      {user.isLoggedIn && (
        <span className={css(styles.p)}>
          <a href="#">Contact us</a>
        </span>
      )}
    </div>
  );
}
