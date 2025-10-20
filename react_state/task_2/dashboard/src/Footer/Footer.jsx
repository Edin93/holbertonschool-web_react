import { StyleSheet, css } from 'aphrodite';
import { getCurrentYear, getFooterCopy } from '../utils/utils';

const styles = StyleSheet.create({
  footer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTop: '5px red solid'
  },
  p: {
    fontFamily: 'Roboto, sans-serif',
    fontStyle: 'italic',
    fontSize: '1.3rem',
    padding: '0 3px'
  }
});

function Footer() {
  return (
    <div className={css(styles.footer)}>
      <p className={css(styles.p)}>Copyright {getCurrentYear()} - {getFooterCopy(true)}</p>
    </div>
  )
}

export default Footer;
