import BodySection from '../BodySection/BodySection';
import './BodySectionWithMarginBottom.css';

export default function BodySectionWithMarginBottom({ title, children }) {
    return (
        <div className='bodySectionWithMargin'>
            <BodySection title={title}>
                {children}
            </BodySection>
        </div>
    )
}
