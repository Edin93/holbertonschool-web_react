import { render, screen } from '@testing-library/react';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';

describe('BodySectionWithMarginBottom', () => {
    it('Renders correctly', () => {
        render(
            <BodySectionWithMarginBottom title="Test Title">
                <p>Test children</p>
            </BodySectionWithMarginBottom>
        );
        const bodySection = screen.getByText('Test Title').closest('.bodySectionWithMargin');
        expect(bodySection).toBeInTheDocument();
        expect(screen.getByText('Test children')).toBeInTheDocument();
    });
});
