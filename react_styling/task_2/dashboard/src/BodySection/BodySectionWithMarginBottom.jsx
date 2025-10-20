import BodySection from './BodySection';

export default function BodySectionWithMarginBottom({ title, children }) {
  return (
    <div className="bodySectionWithMargin">
      <BodySection title={title}>
        {children}
      </BodySection>
    </div>
  );
}