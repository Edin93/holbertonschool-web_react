import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CourseList from './CourseList';
import coursesSlice from '../../features/courses/coursesSlice';

describe('CourseList', () => {
    let store;
    beforeEach(() => {
        store = configureStore({
            reducer: {
                courses: coursesSlice,
            },
        });
    });

    test('Renders without crashing', () => {
        render(
            <Provider store={store}>
                <CourseList />
            </Provider>
        );
        expect(screen.getByText('No course available yet')).toBeInTheDocument();
    });

    test('Displays the list of courses', () => {
        store = configureStore({
            reducer: {
                courses: coursesSlice,
            },
            preloadedState: {
                courses: {
                    courses: [
                        { "id": 1, "name": "ES6", "credit": 60 },
                        { "id": 2, "name": "Webpack", "credit": 20 },
                        { "id": 3, "name": "React", "credit": 40 }
                    ],
                },
            },
        });
        render(
            <Provider store={store}>
                <CourseList />
            </Provider>
        );
        expect(screen.getByText('ES6')).toBeInTheDocument();
        expect(screen.getByText('Webpack')).toBeInTheDocument();
        expect(screen.getByText('React')).toBeInTheDocument();
    });
});
