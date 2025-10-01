import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Login from './Login';
import authSlice from '../../features/auth/authSlice';

describe('Login', () => {
    let store;
    beforeEach(() => {
        store = configureStore({
            reducer: {
                auth: authSlice,
            },
        });
    });

    test('Renders without crashing', () => {
        render(
            <Provider store={store}>
                <Login />
            </Provider>
        );
        expect(screen.getByText(/login to access the full dashboard/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect((screen.getByText(/ok/i)));
    });

    test('Dispatches login action on form submission', () => {
        render(
            <Provider store={store}>
                <Login />
            </Provider>
        );
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
        fireEvent.click(screen.getByText(/ok/i));
        const state = store.getState().auth;
        expect(state.isLoggedIn).toBe(true);
        expect(state.user.email).toBe('test@example.com');
        expect(state.user.password).toBe('password123');
        expect(screen.getByText(/ok/i)).not.toBeDisabled();
    });

    test("Does not dispatches login action on form submission", () => {
        render(
            <Provider store={store}>
                <Login />
            </Provider>
        );
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '453' } });
        fireEvent.click(screen.getByText(/ok/i));
        const state = store.getState().auth;
        expect(state.isLoggedIn).toBe(false);
        expect(state.user.email).toBe('');
        expect(state.user.password).toBe('');
        expect(screen.getByText(/ok/i)).toBeDisabled();
    });
});
