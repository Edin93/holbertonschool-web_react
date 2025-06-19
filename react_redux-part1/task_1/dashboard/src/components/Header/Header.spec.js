import { fireEvent, render, screen } from '@testing-library/react';
import Header from './Header';

export const convertHexToRGBA = (hexCode) => {
    let hex = hexCode.replace('#', '');
    if (hex.length === 3) {
        hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
        console.log({ hex })
    }
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return { r, g, b };
};

test('Should contain a <p/> element with specific text, <h1/>, and an <img/>', () => {
    const loggedInUser = { isLoggedIn: true, email: 'user@example.com', password: 'password123' };
    const mockLogOut = jest.fn();
    render(<Header user={loggedInUser} logOut={mockLogOut} />);
    const headingElement = screen.getByRole('heading', { name: /school Dashboard/i });
    const imgElement = screen.getByAltText('holberton logo')
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveStyle({ color: convertHexToRGBA('#e1003c') })
    expect(imgElement).toBeInTheDocument();
});

test('Should confirm Header is a functional component', () => {
    const HeaderPrototype = Object.getOwnPropertyNames(Header.prototype);
    expect(HeaderPrototype).toEqual(expect.arrayContaining(["constructor"]))
    expect(HeaderPrototype).toHaveLength(1)
    expect(Header.prototype.__proto__).toEqual({})
});

jest.mock('../assets/holberton-logo.jpg', () => 'mocked-path.jpg');

describe('Header Component', () => {
    const defaultUser = { isLoggedIn: false, email: '', password: '' };
    const loggedInUser = { isLoggedIn: true, email: 'user@example.com', password: 'password123' };
    describe('When user is logged out', () => {
        beforeEach(() => {
            render(<Header user={defaultUser} logOut={jest.fn()} />);
        });

        test('Renders basic header elements', () => {
            expect(screen.getByRole('img')).toHaveAttribute('src', 'mocked-path.jpg');
            expect(screen.getByRole('heading')).toHaveTextContent('School Dashboard');
        });

        test('Does not render logout section', () => {
            expect(screen.queryByTestId('logoutSection')).not.toBeInTheDocument();
        });
    });

    describe('When user is logged in', () => {
        const mockLogOut = jest.fn();
        beforeEach(() => {
            render(<Header user={loggedInUser} logOut={mockLogOut} />);
        });

        test('Renders welcome message with user email', () => {
            expect(screen.getByText('Welcome')).toBeInTheDocument();
            expect(screen.getByText('user@example.com')).toBeInTheDocument();
        });

        test('Renders logout link', () => {
            expect(screen.getByRole('link', { name: /logout/i })).toBeInTheDocument();
        });

        test('Calls logOut function when logout link is clicked', () => {
            fireEvent.click(screen.getByRole('link', { name: /logout/i }));
            expect(mockLogOut).toHaveBeenCalledTimes(1);
        });
    });

    test('Does not display logoutSection when user is not logged in', () => {
        render(<Header user={defaultUser} logOut={jest.fn()} />);
        const logoutSection = screen.queryByRole('link', { name: /logout/i });
        expect(logoutSection).not.toBeInTheDocument();
    });

    test('Displays logoutSection when user is logged in', () => {
        render(<Header user={loggedInUser} logOut={jest.fn()} />);
        const logoutSection = screen.getByRole('link', { name: /logout/i });
        expect(logoutSection).toBeInTheDocument();
        expect(screen.getByText(/user@example.com/i)).toBeInTheDocument();
    });

    test('Calls logOut function when logout link is clicked', () => {
        const logOutSpy = jest.fn();
        render(<Header user={loggedInUser} logOut={logOutSpy} />);
        const logoutLink = screen.getByRole('link', { name: /logout/i });
        fireEvent.click(logoutLink);
        expect(logOutSpy).toHaveBeenCalled();
    });

    test('Displays logoutSection when user is logged in', () => {
        const { container } = render(<Header user={loggedInUser} logOut={jest.fn()} />);
        const logoutSection = container.querySelector('div#logoutSection');
        expect(logoutSection).toBeInTheDocument();
    });
});
