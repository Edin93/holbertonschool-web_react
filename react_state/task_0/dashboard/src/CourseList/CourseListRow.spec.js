import { render, screen } from '@testing-library/react';
import CourseListRow from './CourseListRow';

describe('CourseListRow Component', () => {
    it('Renders one <th> with colspan=2 when isHeader is true and textSecondCell is null', () => {
        render(<CourseListRow isHeader={true} textFirstCell="H1" textSecondCell={null} />);
        const thElement = screen.getByText('H1');
        expect(thElement).toBeInTheDocument();
        expect(thElement).toHaveAttribute('colspan', '2');
    });

    it('Renders two <th> cells when isHeader is true and textSecondCell is present', () => {
        render(<CourseListRow isHeader={true} textFirstCell="H1" textSecondCell="H2" />);
        const thFirstCell = screen.getByText('H1');
        const thSecondCell = screen.getByText('H2');
        expect(thFirstCell).toBeInTheDocument();
        expect(thSecondCell).toBeInTheDocument();
        expect(thFirstCell.tagName.toLowerCase()).toBe('th');
        expect(thSecondCell.tagName.toLowerCase()).toBe('th');
    });

    it('Renders two <td> elements when isHeader is false', () => {
        render(<CourseListRow isHeader={false} textFirstCell="C1" textSecondCell="C2" />);
        const tdFirstCell = screen.getByText('C1');
        const tdSecondCell = screen.getByText('C2');
        expect(tdFirstCell).toBeInTheDocument();
        expect(tdSecondCell).toBeInTheDocument();
        expect(tdFirstCell.tagName.toLowerCase()).toBe('td');
        expect(tdSecondCell.tagName.toLowerCase()).toBe('td');
    });
});
