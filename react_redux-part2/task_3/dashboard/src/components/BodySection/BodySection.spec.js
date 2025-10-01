import { render, screen } from '@testing-library/react';
import BodySection from './BodySection';

describe('BodySection', () => {
    it('renders title and children', () => {
        render(
            <BodySection title="Test Title">
                <p>Test children</p>
            </BodySection>
        );
        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(screen.getByText('Test children')).toBeInTheDocument();
    });
});
