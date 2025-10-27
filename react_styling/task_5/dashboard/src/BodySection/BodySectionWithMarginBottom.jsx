import BodySection from './BodySection';

export default function BodySectionWithMarginBottom({ title, children }) {
  return (
    <div className="bodySectionWithMargin mb-10 max-w-full">
      <BodySection title={title}>
        {children}
      </BodySection>
    </div>
  );
}
