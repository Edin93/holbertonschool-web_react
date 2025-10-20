import { StyleSheet, css } from 'aphrodite';
import BodySection from './BodySection';

const styles = StyleSheet.create({
  bodySectionWithMargin: {
    marginBottom: '40px'
  }
});

function BodySectionWithMarginBottom({ title, children }) {
  return (
    <div className={css(styles.bodySectionWithMargin)}>
      <BodySection title={title}>
        {children}
      </BodySection>
    </div>
  )
}

export default BodySectionWithMarginBottom;
