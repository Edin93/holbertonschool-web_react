import { render, screen } from '@testing-library/react';
import { test, expect } from "@jest/globals";
import CourseList from './CourseList';

test('Should render the CourseList component without crashing', () => {
    const props = {
        courses: [
            { id: 1, name: 'ES6', credit: 60 },
            { id: 2, name: 'Webpack', credit: 20 },
            { id: 3, name: 'React', credit: 40 }
        ]
    }
    render(<CourseList {...props} />)
})

test('Should render the CourseList component with 5 rows', () => {
    const props = {
        courses: [
            { id: 1, name: 'ES6', credit: 60 },
            { id: 2, name: 'Webpack', credit: 20 },
            { id: 3, name: 'React', credit: 40 }
        ]
    }
    render(<CourseList {...props} />)
    const rowElements = screen.getAllByRole('row');
    expect(rowElements).toHaveLength(5)
})

test('Should render the CourseList component with 1 rows', () => {
    const props = {
        courses: []
    }
    render(<CourseList {...props} />)
    const rowElement = screen.getAllByRole('row');
    const rowText = screen.getByText('No course available yet');
    expect(rowElement).toHaveLength(1)
    expect(rowText).toBeInTheDocument
})
