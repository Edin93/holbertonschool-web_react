import { render, screen } from '@testing-library/react';
import BodySection from './BodySection';

test('Should pass any number of children without knows then beforehand', () => {
    render(
        <BodySection title="Test Title">
            <p>Child 1</p>
            <p>Child 2</p>
            <p>Child 3</p>
        </BodySection>
    );

    const titleElement = screen.getByRole('heading', { name: /test title/i });
    expect(titleElement).toBeInTheDocument();
    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
    expect(screen.getByText('Child 3')).toBeInTheDocument();
});
