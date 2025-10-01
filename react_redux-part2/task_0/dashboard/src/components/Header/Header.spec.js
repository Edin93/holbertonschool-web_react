import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Header from "./Header";
import authSlice, { login } from '../../features/auth/authSlice';

describe('Header', () => {
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
                <Header />
            </Provider>
        );
        expect(screen.getByText(/school Dashboard/i)).toBeInTheDocument();
    });

    test('Displays logout button when logged in', () => {
        store.dispatch(login({ email: 'test@example.com', password: 'password123' }));
        const { container } = render(
            <Provider store={store}>
                <Header />
            </Provider>
        );
        const logoutSection = container.querySelector('#logoutSection');
        expect(logoutSection).toHaveTextContent(/welcome test@example.com/i);
        const state = store.getState().auth;
        expect(state.isLoggedIn).toBe(true);
    });

    test('Dispatches logout action on logout button click', () => {
        store.dispatch(login({ email: 'test@example.com', password: 'password123' }));
        render(
            <Provider store={store}>
                <Header />
            </Provider>
        );
        fireEvent.click(screen.getByText('(logout)'));
        const state = store.getState().auth;
        expect(state.isLoggedIn).toBe(false);
    });
});
