import React from 'react';
import { render, screen } from '@testing-library/react';
import CourseList from './CourseList';
import App from '../App/App';

describe('CourseList Component', () => {
    test('Renders 5 different rows', () => {
        render(<App isLoggedIn={true} />);
        const rows = screen.getAllByRole('row');
        console.log(rows.values)
        expect(rows.length).toBe(5);
    });
});
