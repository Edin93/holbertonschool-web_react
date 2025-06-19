import authReducer, { login, logout } from '../auth/authSlice';

describe('authSlice', () => {
    const initialState = {
        user: {
            email: '',
            password: '',
        },
        isLoggedIn: false,
    };

    test('should return the initial state', () => {
        expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    test('should handle login', () => {
        const user = { email: 'test@example.com', password: 'password123' };
        const action = login(user);
        const expectedState = {
            user,
            isLoggedIn: true,
        };
        expect(authReducer(initialState, action)).toEqual(expectedState);
    });

    test('should handle logout', () => {
        const loggedInState = {
            user: { email: 'test@example.com', password: 'password123' },
            isLoggedIn: true,
        };
        const action = logout();
        expect(authReducer(loggedInState, action)).toEqual(initialState);
    });
});