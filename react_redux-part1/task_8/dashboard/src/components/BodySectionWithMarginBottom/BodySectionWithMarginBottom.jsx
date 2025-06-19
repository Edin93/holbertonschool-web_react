import BodySection from '../BodySection/BodySection';
import { StyleSheet, css } from 'aphrodite';

export default function BodySectionWithMarginBottom({ title, children }) {
    return (
        <div className={css(styles.bodySectionWithMargin)} data-testid="body-section-with-margin">
            <BodySection title={title}>
                {children}
            </BodySection>
        </div>
    )
}

const styles = StyleSheet.create({
  bodySectionWithMargin: {
    marginBottom: '40px',
  },
});