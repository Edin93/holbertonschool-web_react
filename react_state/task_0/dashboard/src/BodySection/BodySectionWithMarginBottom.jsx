import React from 'react'
import BodySection from './BodySection';
import './BodySectionWithMarginBottom.css'


export default function BodySectionWithMarginBottom(props) {
    return (
        <div className='bodySectionWithMargin' data-testid="body-section-with-margin">
            <BodySection {...props} />
        </div>
    );
}
