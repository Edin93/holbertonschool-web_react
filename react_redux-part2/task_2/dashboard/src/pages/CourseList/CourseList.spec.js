import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import mockAxios from 'jest-mock-axios';
import CourseList from './CourseList';
import coursesSlice, { fetchCourses } from '../../features/courses/coursesSlice';

describe('CourseList', () => {
  const COURSES_DATA = [
    { id: 1, name: 'ES6', credit: 60 },
    { id: 2, name: 'Webpack', credit: 20 },
    { id: 3, name: 'React', credit: 40 }
  ];

  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        courses: coursesSlice,
      },
    });
  });

  afterEach(() => {
    mockAxios.reset();
  });

  test('renders without crashing', () => {
    render(
      <Provider store={store}>
        <CourseList />
      </Provider>
    );
    expect(screen.getByText('No course available yet')).toBeInTheDocument();
  });

  test('displays the list of courses', async () => {
    const promise = store.dispatch(fetchCourses());

    mockAxios.mockResponse({
      data: {
        courses: COURSES_DATA
      }
    });

    await promise;

    render(
      <Provider store={store}>
        <CourseList />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('ES6')).toBeInTheDocument();
      expect(screen.getByText('Webpack')).toBeInTheDocument();
      expect(screen.getByText('React')).toBeInTheDocument();
    });
  });

  test('select and unselect a course when the checkbox is clicked', async () => {
    const promise = store.dispatch(fetchCourses());

    mockAxios.mockResponse({
      data: {
        courses: COURSES_DATA
      }
    });

    await promise;

    render(
      <Provider store={store}>
        <CourseList />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getAllByRole('checkbox')).toHaveLength(COURSES_DATA.length);
    });

    const rows = screen.getAllByRole('row').filter(row => {
      return !row.querySelector('th');
    });

    expect(rows).toHaveLength(COURSES_DATA.length);

    const firstCell = within(rows[0]).getAllByRole('cell');

    const checkbox = within(firstCell[0]).getByRole('checkbox');

    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    await waitFor(() => {
      expect(store.getState().courses.courses[0].isSelected).toBe(true);
      expect(checkbox).toBeChecked();
    });

    fireEvent.click(checkbox);
    await waitFor(() => {
      expect(store.getState().courses.courses[0].isSelected).toBe(false);
      expect(checkbox).not.toBeChecked();
    });
  });
});
