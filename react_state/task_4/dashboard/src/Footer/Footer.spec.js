import { getFooterCopy } from '../utils/utils';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer/Footer';
import { newContext } from '../Context/context';

const renderWithContext = (value) => {
    return render(
        <newContext.Provider value={value}>
            <Footer />
        </newContext.Provider>
    );
};

describe('Footer Component', () => {
    test('Renders correct copyright string when getFooterCopy returns true', () => {
        expect(getFooterCopy(true)).toBe('Holberton School');
    });

    test('Does not display "Contact us" link when the user is logged out', () => {
        const contextValue = {
            user: {
                isLoggedIn: false,
            },
        };
        renderWithContext(contextValue);
        const contactLink = screen.queryByText('Contact us');
        expect(contactLink).toBeNull();
    });

    test('Displays "Contact us" link when the user is logged in', () => {
        const contextValue = {
            user: {
                isLoggedIn: true,
            },
        };
        renderWithContext(contextValue);
        const contactLink = screen.getByText('Contact us');
        expect(contactLink).toBeInTheDocument();
    });
})
