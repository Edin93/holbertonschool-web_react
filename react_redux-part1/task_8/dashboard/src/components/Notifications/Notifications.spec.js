import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Notifications from './Notifications';
import notificationsSlice from '../../features/notifications/notificationsSlice';

describe('Notifications', () => {
    let store;
    beforeEach(() => {
        store = configureStore({
            reducer: {
                notifications: notificationsSlice,
            },
        });
    });

    test('Renders without crashing', () => {
        render(
            <Provider store={store}>
                <Notifications />
            </Provider>
        );
        expect(screen.getByText('Your notifications')).toBeInTheDocument();
    });

    test('Toggles drawer on click', () => {
        render(
            <Provider store={store}>
                <Notifications />
            </Provider>
        );
        fireEvent.click(screen.getByText(/your notifications/i));
        const state = store.getState().notifications;
        expect(state.displayDrawer).toBe(true);
    });

    test('Close drawer on close button', () => {
        store = configureStore({
            reducer: {
                notifications: notificationsSlice,
            },
            preloadedState: {
                notifications: {
                    notifications: [
                        { "id": 1, "type": "default", "value": "New course available" },
                        { "id": 2, "type": "urgent", "value": "New resume available" },
                        { "id": 3, "type": "urgent", "html": { __html: '<strong>Urgent requirement</strong> - complete by EOD' } }
                    ],
                    displayDrawer: true,
                },
            },
        });
        render(
            <Provider store={store}>
                <Notifications />
            </Provider>
        );
        fireEvent.click(screen.getByAltText(/close icon/i));
        const state = store.getState().notifications;
        expect(state.displayDrawer).toBe(false);
    });

    test('Marks notification as read', () => {
        store = configureStore({
            reducer: {
                notifications: notificationsSlice,
            },
            preloadedState: {
                notifications: {
                    notifications: [
                        { "id": 1, "type": "default", "value": "New course available" },
                        { "id": 2, "type": "urgent", "value": "New resume available" },
                        { "id": 3, "type": "urgent", "html": { __html: '<strong>Urgent requirement</strong> - complete by EOD' } }
                    ],
                    displayDrawer: true,
                },
            },
        });
        render(
            <Provider store={store}>
                <Notifications />
            </Provider>
        );
        fireEvent.click(screen.getByText('New course available'));
        const state = store.getState().notifications;
        expect(state.notifications).toEqual([
            { "id": 2, "type": "urgent", "value": "New resume available" },
            { "id": 3, "type": "urgent", "html": { __html: '<strong>Urgent requirement</strong> - complete by EOD' } }
        ]);
    });
});
