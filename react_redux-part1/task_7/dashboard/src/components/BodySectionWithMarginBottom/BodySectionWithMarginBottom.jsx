import { StyleSheet, css } from 'aphrodite';
import BodySection from '../BodySection/BodySection';

export default function BodySectionWithMarginBottom(props) {
  return (
    <div className={css(styles.bodySectionWithMargin)} data-testid="body-section-with-margin">
      <BodySection {...props} />
    </div>
  );
}

const styles = StyleSheet.create({
  bodySectionWithMargin: {
    marginBottom: '40px',
  },
});