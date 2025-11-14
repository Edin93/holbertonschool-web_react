import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import mockAxios from 'jest-mock-axios';
import App from '../App';
import authReducer, { login } from '../features/auth/authSlice';
import coursesReducer from '../features/courses/coursesSlice';
import notificationsReducer from '../features/notifications/notificationsSlice';

describe('App Component Integration Tests', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
        courses: coursesReducer,
        notifications: notificationsReducer,
      },
    });
  });

  afterEach(() => {
    mockAxios.reset();
  });

  test('should NOT populate courses when not logged in', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    mockAxios.mockResponse({
      data: {
        notifications: [
          { id: 1, type: 'default', value: 'New course available' },
          { id: 2, type: 'urgent', value: 'New resume available' },
          { id: 3, type: 'urgent', value: 'Placeholder' },
        ],
      },
    });

    await waitFor(() => {
      expect(store.getState().courses.courses).toHaveLength(0);
      expect(store.getState().notifications).toEqual({
        loading: false,
        notifications: [
          { id: 1, type: 'default', value: 'New course available' },
          { id: 2, type: 'urgent', value: 'New resume available' },
          {
            id: 3,
            type: 'urgent',
            html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' },
          },
        ],
      });
    });

    expect(screen.getByText('Log in to continue')).toBeInTheDocument();
  });

  test('should populate courses WHEN logged in', async () => {
    store.dispatch(login({ email: 'test@example.com' }));

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    mockAxios.mockResponse({
      data: {
        notifications: [
          { id: 1, type: 'default', value: 'New course available' },
          { id: 2, type: 'urgent', value: 'New resume available' },
          { id: 3, type: 'urgent', value: 'Placeholder' },
        ],
      },
    });

    mockAxios.mockResponse({
      data: {
        courses: [
          { id: 1, name: 'ES6', credit: 60 },
          { id: 2, name: 'Webpack', credit: 20 },
          { id: 3, name: 'React', credit: 40 },
        ],
      },
    });

    await waitFor(() => {
      expect(store.getState().courses.courses).toEqual([
        { id: 1, name: 'ES6', credit: 60 },
        { id: 2, name: 'Webpack', credit: 20 },
        { id: 3, name: 'React', credit: 40 },
      ]);
    });

    expect(screen.getByText('Course list')).toBeInTheDocument();
  });

  test('should CLEAR courses on logout', async () => {
    const user = userEvent.setup();

    store.dispatch(login({ email: 'test@example.com' }));

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    mockAxios.mockResponse({
      data: {
        notifications: [
          { id: 1, type: 'default', value: 'New course available' },
          { id: 2, type: 'urgent', value: 'New resume available' },
          { id: 3, type: 'urgent', value: 'Placeholder' },
        ],
      },
    });

    mockAxios.mockResponse({
      data: {
        courses: [
          { id: 1, name: 'ES6', credit: 60 },
          { id: 2, name: 'Webpack', credit: 20 },
          { id: 3, name: 'React', credit: 40 },
        ],
      },
    });

    await waitFor(() => {
      expect(store.getState().courses.courses).toEqual([
        { id: 1, name: 'ES6', credit: 60 },
        { id: 2, name: 'Webpack', credit: 20 },
        { id: 3, name: 'React', credit: 40 },
      ]);
    });

    const logoutLink = screen.getByText('(logout)');
    await user.click(logoutLink);

    await waitFor(() => {
      expect(store.getState().auth.isLoggedIn).toBe(false);
      expect(store.getState().courses.courses).toEqual([]);
    });

    expect(screen.getByText('Log in to continue')).toBeInTheDocument();
  });
});
