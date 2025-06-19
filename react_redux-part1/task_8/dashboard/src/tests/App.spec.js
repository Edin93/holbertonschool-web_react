import { act, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import App from '../App';
import authSlice, { logout, login } from '../features/auth/authSlice';
import notificationsSlice from '../features/notifications/notificationsSlice';
import coursesSlice from '../features/courses/coursesSlice';

describe('App Component Integration Tests', () => {
    let store;
    let axiosMock;
    beforeEach(() => {
        store = configureStore({
            reducer: {
                auth: authSlice,
                courses: coursesSlice,
                notifications: notificationsSlice
            },
        });
        axiosMock = new MockAdapter(axios);
        axiosMock
            .onGet('http://localhost:5173/courses.json')
            .reply(200, {
                courses: [
                    { id: 1, name: 'ES6', credit: 60 },
                    { id: 2, name: 'Webpack', credit: 20 },
                    { id: 3, name: 'React', credit: 40 },
                ],
            });
        axiosMock
            .onGet('http://localhost:5173/notifications.json')
            .reply(200, {
                notifications: [
                    { id: 1, type: 'default', value: 'New course available' },
                    { id: 2, type: 'urgent', value: 'New resume available' },
                    { id: 3, type: 'urgent', html: { __html: '' } },
                ],
            });
    });
    afterEach(() => {
        axiosMock.restore();
    });
    const renderWithStore = () => {
        return render(
            <Provider store={store}>
                <App />
            </Provider>
        );
    };

    test('Should not populate courses when not logged in', async () => {
        renderWithStore();
        expect(store.getState().courses.courses).toHaveLength(0);
        await waitFor(() => {
            expect(store.getState().courses.courses).toHaveLength(0);
            expect(store.getState().notifications).toEqual({
                displayDrawer: true,
                notifications: [
                    { id: 1, type: 'default', value: 'New course available' },
                    { id: 2, type: 'urgent', value: 'New resume available' },
                    { id: 3, type: 'urgent', html: { __html: "<strong>Urgent requirement</strong> - complete by EOD" } },
                ],
            });
        });
    });

    test('Should populate courses WHEN logged in', async () => {
        store.dispatch(login({
            email: 'test@example.com',
            password: 'password123'
        }));
        renderWithStore();
        expect(store.getState().courses.courses).toHaveLength(0);
        await waitFor(() => {
            expect(store.getState().courses.courses).toEqual([
                { id: 1, name: 'ES6', credit: 60 },
                { id: 2, name: 'Webpack', credit: 20 },
                { id: 3, name: 'React', credit: 40 },
            ],
            );
            expect(store.getState().notifications).toEqual({
                displayDrawer: true,
                notifications: [
                    { id: 1, type: 'default', value: 'New course available' },
                    { id: 2, type: 'urgent', value: 'New resume available' },
                    { id: 3, type: 'urgent', html: { __html: "<strong>Urgent requirement</strong> - complete by EOD" } },
                ],
            });
        });
    });

    test('Should CLEAR courses on logout', async () => {
        store.dispatch(login({
            email: 'test@example.com',
            password: 'password123'
        }));
        renderWithStore();
        await waitFor(() => {
            expect(store.getState().courses.courses).toEqual([
                { id: 1, name: 'ES6', credit: 60 },
                { id: 2, name: 'Webpack', credit: 20 },
                { id: 3, name: 'React', credit: 40 },
            ],
            );
        });
        act(() => store.dispatch(logout()))
        expect(store.getState().courses.courses).toHaveLength(0);
    });
});
