import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CourseList from './CourseList';
import coursesReducer from '../../features/courses/coursesSlice';

const createMockStore = (initialState) => {
  return configureStore({
    reducer: {
      courses: coursesReducer
    },
    preloadedState: initialState
  });
};

const renderWithRedux = (component, initialState) => {
  const store = createMockStore(initialState);
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  );
};

test('it should render the CourseList component without crashing', () => {
  const initialState = {
    courses: {
      courses: [
        { id: 1, name: 'ES6', credit: 60 },
        { id: 2, name: 'Webpack', credit: 20 },
        { id: 3, name: 'React', credit: 40 }
      ]
    }
  };
  renderWithRedux(<CourseList />, initialState);
})

test('it should render the CourseList component with 5 rows', () => {
  const initialState = {
    courses: {
      courses: [
        { id: 1, name: 'ES6', credit: 60 },
        { id: 2, name: 'Webpack', credit: 20 },
        { id: 3, name: 'React', credit: 40 }
      ]
    }
  };
  renderWithRedux(<CourseList />, initialState);

  const rowElements = screen.getAllByRole('row');

  expect(rowElements).toHaveLength(5)
})

test('it should render the CourseList component with 1 rows', () => {
  const initialState = {
    courses: {
      courses: []
    }
  };

  renderWithRedux(<CourseList />, initialState);

  const rowElements = screen.getAllByRole('row');

  expect(rowElements).toHaveLength(1)
})
