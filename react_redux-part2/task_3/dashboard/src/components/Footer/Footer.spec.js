import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Footer from './Footer';
import authSlice, { login } from '../../features/auth/authSlice';

describe('Footer', () => {
    let store;
    beforeEach(() => {
        store = configureStore({
            reducer: {
                auth: authSlice,
            },
        });
    });

    test('Renders without crashing', () => {
        const currentYear = new Date().getFullYear();
        const expectedText = `Copyright ${currentYear} - Holberton School`;
        render(
            <Provider store={store}>
                <Footer />
            </Provider>
        );
        const footerText = screen.getByText(expectedText);
        expect(footerText).toBeTruthy();
    });

    test('Displays "Contact us" link when logged in', () => {
        store.dispatch(login({ email: 'test@example.com', password: 'password123' }));
        render(
            <Provider store={store}>
                <Footer />
            </Provider>
        );
        const contactUsLink = screen.getByText(/contact us/i);
        expect(contactUsLink).toBeInTheDocument();
        expect(contactUsLink).toBeInstanceOf(HTMLAnchorElement);
        expect(contactUsLink).toHaveAttribute('href');
    });

    test('Does not display "Contact us" link when logged out', () => {
        render(
            <Provider store={store}>
                <Footer />
            </Provider>
        );
        expect(screen.queryByText(/contact us/i)).not.toBeInTheDocument();
    });
});
