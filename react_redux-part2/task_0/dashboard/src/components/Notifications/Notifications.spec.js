import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Notifications from './Notifications';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import notificationsSlice, { fetchNotifications } from '../../features/notifications/notificationsSlice';

describe('Notifications', () => {
    let store;
    let mockAxios;
    beforeEach(() => {
        store = configureStore({
            reducer: {
                notifications: notificationsSlice,
            },
        });
        mockAxios = new MockAdapter(axios);
    });

    test('Renders without crashing', () => {
        render(
            <Provider store={store}>
                <Notifications />
            </Provider>
        );
        expect(screen.getByText('Your notifications')).toBeInTheDocument();
    });

    test('toggles drawer visibility when clicking the title', async() => {
        mockAxios.onGet('http://localhost:5173/notifications.json').reply(200, {
          notifications: [
            { id: 1, type: 'default', value: 'New course available' },
            { id: 2, type: 'urgent', value: 'New resume available' },
            { id: 3, type: 'urgent', html: { __html: '' } },
          ],
        });
    
        const notificationsResponse = await axios.get('http://localhost:5173/notifications.json');
        expect(notificationsResponse.data.notifications).toHaveLength(3);
    
        await store.dispatch(fetchNotifications());
    
        const { container } = render(
          <Provider store={store}>
            <Notifications />
          </Provider>
        );
    
        const notificationsDrawer = container.querySelector('.Notifications');
        expect(notificationsDrawer).toHaveClass('visible');
    
        fireEvent.click(screen.getByText(/your notifications/i));
        expect(notificationsDrawer).not.toHaveClass('visible');
        expect(screen.queryByRole('listitem', { name: 'New course available' })).not.toBeInTheDocument();
        expect(screen.queryByRole('listitem', { name: 'New resume available' })).not.toBeInTheDocument();
    
        fireEvent.click(screen.getByText(/your notifications/i));
        expect(notificationsDrawer).toHaveClass('visible');
        expect(screen.getByText('New course available')).toBeInTheDocument();
        expect(screen.getByText('New resume available')).toBeInTheDocument();
      });

    test('close drawer on close button', async () => {
        mockAxios.onGet('http://localhost:5173/notifications.json').reply(200, {
          notifications: [
            { id: 1, type: 'default', value: 'New course available' },
            { id: 2, type: 'urgent', value: 'New resume available' },
            { id: 3, type: 'urgent', html: { __html: '' } },
          ],
        });
    
        const notificationsResponse = await axios.get('http://localhost:5173/notifications.json');
        expect(notificationsResponse.data.notifications).toHaveLength(3);
    
        await store.dispatch(fetchNotifications());
    
        const { container } = render(
          <Provider store={store}>
            <Notifications />
          </Provider>
        );
    
        const notificationsDrawer = container.querySelector('.Notifications');
        fireEvent.click(screen.getByAltText('close icon'));
        expect(notificationsDrawer).not.toHaveClass('visible');
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
