// Catch browser warns and errors
const originalError = console.error;
const originalWarn = console.warn;

let consoleOutput = [];

console.error = (...args) => {
    consoleOutput.push(['error', args[0]]);
};

console.warn = (...args) => {
    consoleOutput.push(['warn', args[0]]);
};

beforeEach(() => {
    consoleOutput = [];
});

afterEach(() => {
    jest.clearAllMocks();

    if (consoleOutput.length > 0) {
        throw new Error(
            'Test failed: Console warnings or errors detected:\n' +
            consoleOutput.map(([type, message]) => `${type}: ${message}`).join('\n')
        );
    }
});

import React, { useCallback, useState } from 'react';
import { act, render, fireEvent, renderHook, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from "../App";
import { getLatestNotification } from '../utils/utils';
import mockAxios from 'jest-mock-axios';

jest.mock('axios', () => require('jest-mock-axios').default);

const mockBodySection = jest.fn();
jest.mock("../components/BodySection/BodySection", () => {
    const MockBodySection = (props) => {
        mockBodySection(props);
        return (
            <div>
                <h2>{props.title}</h2>
                {props.children}
            </div>
        );
    };
    MockBodySection.displayName = 'MockBodySection';
    return MockBodySection;
});

test('Should confirm App is a function component', () => {
    expect(Object.keys(App.prototype)).toHaveLength(0);
    expect(Object.getPrototypeOf(App)).not.toBe(React.Component);
    expect(typeof App).toBe('function');
    expect(App.prototype?.render).toBe(undefined);
});

test('Should add the title of "Log in to continue" above the Login component when the isLoggedIn prop set to false', () => {
    render(<App isLoggedIn={false} />)
    expect(screen.getByRole('heading', { name: /log in to continue/i })).toBeInTheDocument();
});

test('Should render BodySection as a child component', () => {
    render(<App isLoggedIn={false} />);
    expect(mockBodySection).toHaveBeenCalled();
});

test('Should render BodySection with news when logged in', () => {
    render(<App isLoggedIn={true} />);
    expect(mockBodySection).toHaveBeenCalled();
});

test('Should render a heading element with a text "", and a paragraph with text ""', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /news from the school/i })).toBeInTheDocument();
    expect(screen.getByText(/holberton school news goes here/i)).toBeInTheDocument()
});

describe('Test HOC log mount and unmount "Login" and "CourseList" components', () => {
    beforeEach(() => {
        jest.spyOn(console, 'log').mockImplementation(() => { });
    });

    afterEach(() => {
        console.log.mockRestore();
    });

    test('Logs when CourseList is mounted and unmounted based on "isLoggedIn" prop value, and handles nameless components', async () => {
        const { rerender, unmount, container } = render(<App />);
        expect(screen.getByText(/login to access the full dashboard/i)).toBeInTheDocument();
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const submitButton = screen.getByRole('button', { name: /ok/i });
        fireEvent.change(emailInput, { target: { value: 'email@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        expect(submitButton).not.toBeDisabled();
        fireEvent.click(submitButton);
        await waitFor(() => {
            expect(screen.getByText(/course list/i)).toBeInTheDocument();
            const logoutSection = container.querySelector("div#logoutSection");
            expect(within(logoutSection).getByText('email@example.com')).toBeInTheDocument();
            expect(within(logoutSection).getByText(/logout/i)).toBeInTheDocument();
        });
        expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/Component CourseList is mounted|Component Component is mounted/));
        rerender();
        expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/Component CourseList is mounted|Component Component is mounted/));
        unmount();
        expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/Component CourseList is going to unmount/));
        const logCalls = console.log.mock.calls;
        expect(logCalls.filter(call => call[0].includes('Component CourseList is mounted') || call[0].includes('Component Component is mounted')).length).toBeGreaterThanOrEqual(1);
        expect(logCalls.filter(call => call[0].includes('Component CourseList is going to unmount') || call[0].includes('Component Component is going to unmount')).length).toBe(1);
    });

    test('Logs when Login is mounted and unmounted based on "isLoggedIn" prop value, and handles nameless components', () => {
        const { unmount } = render(<App />);
        expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/Component (Login|Component) is mounted/));
        render(<App />);
        expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/Component (Login|Component) is mounted/));
        unmount();
        expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/Component (Login|Component) is going to unmount/));
        const logCalls = console.log.mock.calls;
        expect(logCalls.filter(call => call[0].includes('Component Login is mounted') || call[0].includes('Component Component is mounted')).length).toBe(2);
        expect(logCalls.filter(call => call[0].includes('Component Login is going to unmount') || call[0].includes('Component Component is going to unmount')).length).toBe(1);
    });
})

test('Should display CourseList and welcome message after login and hide them after logout', async () => {
    render(<App />);
    expect(screen.getByText('Log in to continue')).toBeInTheDocument();
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /ok/i });
    await act(async () => {
        await userEvent.type(emailInput, 'email@example.com');
        await userEvent.type(passwordInput, 'password123');
        await userEvent.click(submitButton);
    });
    expect(screen.getByText('Course list')).toBeInTheDocument();
    const logoutLink = screen.getByRole('link', { name: /logout/i });
    await act(async () => {
        await userEvent.click(logoutLink);
    });
    await waitFor(() => {
        expect(screen.getByText(/log in to continue/i)).toBeInTheDocument();
        expect(screen.queryByText(/course list/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Welcome/)).not.toBeInTheDocument();
    });
});

test('Should handle login with valid email and password', async () => {
    render(<App />);
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /ok/i });
    await act(async () => {
        fireEvent.change(emailInput, { target: { value: 'email@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(submitButton);
    });
    expect(screen.getByText('Course list')).toBeInTheDocument();
    expect(screen.queryByText('Log in to continue')).not.toBeInTheDocument();
    const logoutSection = document.querySelector('#logoutSection');
    expect(logoutSection).toBeInTheDocument();
    expect(logoutSection).toHaveTextContent('email@example.com');
});

test('Should render login page when the user is not logged in and handle login flow correctly', async () => {
    render(<App />);
    expect(screen.getByText('Log in to continue')).toBeInTheDocument();
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /ok/i });
    await act(async () => {
        fireEvent.change(emailInput, { target: { value: 'email@example.com' } });
        fireEvent.change(passwordInput, { target: { value: '12345678' } });
        fireEvent.click(submitButton);
    });
    expect(screen.getByText(/course list/i)).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
    const logoutSection = screen.getByText(/logout/i);
    expect(logoutSection).toBeInTheDocument();
    await act(async () => {
        fireEvent.click(logoutSection);
    });
    expect(screen.getByText(/log in to continue/i)).toBeInTheDocument();
});

test('logIn updates user state and renders CourseList', () => {
    render(<App />);
    expect(screen.getByText(/log in to continue/i)).toBeInTheDocument();
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /ok/i });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);
    expect(screen.getByText(/course list/i)).toBeInTheDocument();
});

test('logOut function should clears user state and renders Login form', async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /ok/i });

    act(() => {
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(submitButton);
    });
    expect(screen.getByText(/course list/i)).toBeInTheDocument();
    const logoutSection = container.querySelector('#logoutSection');
    const logoutLink = logoutSection.querySelector('a');
    await user.click(logoutLink);
    await waitFor(() => {
        expect(container.querySelector('#logoutSection')).not.toBeInTheDocument();
        expect(screen.queryByText(/course list/i)).not.toBeInTheDocument();
        expect(screen.queryByText('test@example.com')).not.toBeInTheDocument();
        const loginTitle = screen.getByText(/log in to continue/i);
        expect(loginTitle).toBeInTheDocument();
    });
});

describe('App Component Tests', () => {
    const mockNotificationsResponse = {
        data: {
            notifications: [
                { id: 1, type: 'default', value: 'New course available' },
                { id: 2, type: 'urgent', value: 'New resume available' },
                { id: 3, type: 'urgent', html: { __html: getLatestNotification() } }
            ]
        }
    };

    beforeEach(() => mockAxios.reset());
    afterEach(() => mockAxios.reset());

    test('Verify notification item deletion', async () => {
        const user = userEvent.setup();
        mockAxios.get.mockImplementationOnce(() => Promise.resolve(mockNotificationsResponse));
        render(<App />);
        await waitFor(() => {
            const listItems = screen.getAllByRole('listitem');
            expect(listItems).toHaveLength(3);
        });
        expect(screen.getByText('New course available')).toBeInTheDocument();
        expect(screen.getByText('New resume available')).toBeInTheDocument();
        expect(screen.getByText((content, element) => {
            return element.textContent === 'Urgent requirement - complete by EOD';
        })).toBeInTheDocument();
        await user.click(screen.getByText('New course available'));
        await waitFor(() => {
            expect(screen.queryByText('New course available')).not.toBeInTheDocument();
            expect(screen.getAllByRole('listitem')).toHaveLength(2);
        });
        const notificationCalls = mockAxios.get.mock.calls.filter(
            call => call[0].includes('notifications')
        );
        expect(notificationCalls).toHaveLength(1);
    });
});

describe('App component when user is logged in', () => {
    const mockCoursesResponse = {
        data: {
            "courses": [
                { "id": 1, "name": "ES6", "credit": 60 },
                { "id": 2, "name": "Webpack", "credit": 20 },
                { "id": 3, "name": "React", "credit": 40 }
            ]
        }
    };
    const mockEmptyNotificationsResponse = {
        data: {
            notifications: []
        }
    };

    afterEach(() => {
        mockAxios.reset();
    });

    test('The App component should fetch courses data successfully whenever user is logged in', async () => {
        const user = userEvent.setup();
        mockAxios.get.mockImplementation((url) => {
            if (url.includes('notifications')) {
                return Promise.resolve(mockEmptyNotificationsResponse);
            }
            if (url.includes('courses')) {
                return Promise.resolve(mockCoursesResponse);
            }
        });
        render(<App />);
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const submitButton = screen.getByRole('button', { name: /ok/i });
        await user.type(emailInput, 'test@example.com');
        await user.type(passwordInput, 'password123');
        await user.click(submitButton);
        await waitFor(() => {
            expect(screen.getByText('ES6')).toBeInTheDocument();
            expect(screen.getByText('Webpack')).toBeInTheDocument();
            expect(screen.getByText('React')).toBeInTheDocument();
        });
    });
});

describe('App Component State Management', () => {
    const mockNotificationsResponse = {
        data: {
            notifications: [
                { id: 1, type: 'default', value: 'New course available' },
                { id: 2, type: 'urgent', value: 'New resume available' },
                { id: 3, type: 'urgent', html: { __html: getLatestNotification() } }
            ]
        }
    };

    const mockCoursesResponse = {
        data: {
            courses: [
                { id: 1, name: "ES6", credit: 60 },
                { id: 2, name: "Webpack", credit: 20 },
                { id: 3, name: "React", credit: 40 }
            ]
        }
    };

    afterEach(() => {
        mockAxios.reset();
    });

    describe('DisplayDrawer State Tests', () => {
        test('DisplayDrawer state management and notification visibility', async () => {
            const user = userEvent.setup();
            mockAxios.get.mockResolvedValueOnce(mockNotificationsResponse);
            render(<App />);
            await waitFor(() => {
                expect(screen.getByText(/here is the list of notifications/i)).toBeVisible();
            });
            await user.click(screen.getByRole('button', { name: /close/i }));
            await waitFor(() => {
                expect(screen.queryByText(/here is the list of notifications/i)).not.toBeInTheDocument();
            });
            await user.click(screen.getByText(/your notifications/i));
            await waitFor(() => {
                expect(screen.getByText(/here is the list of notifications/i)).toBeVisible();
            });
        });

        test('displayDrawer keyboard interactions', async () => {
            const user = userEvent.setup();
            mockAxios.get.mockResolvedValueOnce(mockNotificationsResponse);
            render(<App />);
            await waitFor(() => {
                expect(screen.getByText(/here is the list of notifications/i)).toBeVisible();
            });
            await user.click(screen.getByRole('button', { name: /close/i }));
            await waitFor(() => {
                expect(screen.queryByText(/here is the list of notifications/i)).not.toBeInTheDocument();
            });
        });

        test('Should remove notification items once click on it', async () => {
            const user = userEvent.setup();
            mockAxios.get.mockResolvedValueOnce(mockNotificationsResponse);
            render(<App />);
            await waitFor(() => {
                expect(screen.getAllByRole('listitem')).toHaveLength(3);
            });
            await user.click(screen.getAllByRole('listitem')[0]);
            await waitFor(() => {
                const updatedListItems = screen.getAllByRole('listitem');
                expect(updatedListItems).toHaveLength(2);
                expect(screen.queryByText('New course available')).not.toBeInTheDocument();
            });
        });
    });

    describe('User State Tests', () => {
        test('User state management through login/logout cycle', async () => {
            const user = userEvent.setup();
            mockAxios.get.mockImplementation((url) => {
                if (url.includes('notifications')) {
                    return Promise.resolve(mockNotificationsResponse);
                }
                if (url.includes('courses')) {
                    return Promise.resolve(mockCoursesResponse);
                }
                return Promise.reject(new Error('Invalid URL'));
            });
            render(<App />);
            await waitFor(() => {
                expect(screen.getByRole('heading', { name: /log in to continue/i })).toBeInTheDocument();
            });
            const emailInput = screen.getByLabelText(/email/i);
            const passwordInput = screen.getByLabelText(/password/i);
            const loginButton = screen.getByRole('button', { name: /ok/i });
            await user.type(emailInput, 'test@example.com');
            await user.type(passwordInput, 'password123');
            await user.click(loginButton);
            await waitFor(() => {
                expect(screen.getByText(/course list/i)).toBeInTheDocument();
                expect(screen.queryByText(/log in to continue/i)).not.toBeInTheDocument();
            });
            const logoutButton = screen.getByText(/logout/i);
            await user.click(logoutButton);
            await waitFor(() => {
                expect(screen.getByRole('heading', { name: /log in to continue/i })).toBeInTheDocument();
                expect(screen.queryByText(/course list/i)).not.toBeInTheDocument();
            });
        });
    });

    describe('Notifications State Tests', () => {
        const mockNotificationsResponse = {
            data: {
                notifications: [
                    { id: 1, type: 'default', value: 'New course available' },
                    { id: 2, type: 'urgent', value: 'New resume available' },
                    { id: 3, type: 'urgent', html: { __html: getLatestNotification() } }
                ]
            }
        };

        afterEach(() => {
            mockAxios.reset();
        });

        test('Notifications state management and interactions', async () => {
            const user = userEvent.setup();
            mockAxios.get.mockResolvedValueOnce(mockNotificationsResponse);
            render(<App />);
            await waitFor(() => {
                expect(screen.getByText('New course available')).toBeInTheDocument();
                expect(screen.getByText('New resume available')).toBeInTheDocument();
            });
            const firstNotification = screen.getByText('New course available');
            await user.click(firstNotification);
            await waitFor(() => {
                expect(screen.queryByText('New course available')).not.toBeInTheDocument();
            });
        });

        test('Notifications priority and ordering', async () => {
            mockAxios.get.mockResolvedValueOnce(mockNotificationsResponse);
            render(<App />);
            await waitFor(() => {
                const notifications = screen.getAllByRole('listitem');
                const urgentNotifications = notifications.filter(notification =>
                    window.getComputedStyle(notification).color === 'red'
                );
                expect(urgentNotifications.length).toBeGreaterThan(0);
                expect(notifications[1]).toBe(urgentNotifications[0]);
            });
        });
    });
});

describe('App Component Hooks', () => {
    describe('handleDisplayDrawer', () => {
        test('Should toggle display state to true', () => {
            const { result } = renderHook(() => {
                const [displayDrawer, setDisplayDrawer] = useState(false);
                const handleDisplayDrawer = useCallback(() => {
                    setDisplayDrawer(true);
                }, []);
                return { displayDrawer, handleDisplayDrawer };
            });
            act(() => {
                result.current.handleDisplayDrawer();
            });
            expect(result.current.displayDrawer).toBe(true);
        });

        test('Should maintain reference equality between renders', () => {
            const { result, rerender } = renderHook(() => {
                const [displayDrawer, setDisplayDrawer] = useState(false);
                const handleDisplayDrawer = useCallback(() => {
                    setDisplayDrawer(true);
                }, []);
                return { displayDrawer, handleDisplayDrawer };
            });
            const firstReference = result.current.handleDisplayDrawer;
            rerender();
            expect(result.current.handleDisplayDrawer).toBe(firstReference);
        });
    });

    describe('handleHideDrawer', () => {
        it('Should toggle display state to false', () => {
            const { result } = renderHook(() => {
                const [displayDrawer, setDisplayDrawer] = useState(true);
                const handleHideDrawer = useCallback(() => {
                    setDisplayDrawer(false);
                }, []);
                return { displayDrawer, handleHideDrawer };
            });
            act(() => {
                result.current.handleHideDrawer();
            });
            expect(result.current.displayDrawer).toBe(false);
        });
    });

    describe('logOut', () => {
        test('should reset user state', () => {
            const { result } = renderHook(() => {
                const [user, setUser] = useState({
                    email: 'test@test.com',
                    password: 'password123',
                    isLoggedIn: true
                });
                const logOut = useCallback(() => {
                    setUser({
                        email: '',
                        password: '',
                        isLoggedIn: false,
                    });
                }, []);
                return { user, logOut };
            });
            act(() => {
                result.current.logOut();
            });
            expect(result.current.user).toEqual({
                email: '',
                password: '',
                isLoggedIn: false
            });
        });
    });

    describe('markNotificationAsRead', () => {
        const mockNotifications = [
            { id: 1, type: 'default', value: 'Test 1' },
            { id: 2, type: 'urgent', value: 'Test 2' }
        ];

        test('Should remove notification with specified id', () => {
            const { result } = renderHook(() => {
                const [notifications, setNotifications] = useState(mockNotifications);
                const markNotificationAsRead = useCallback((id) => {
                    setNotifications(prev =>
                        prev.filter(notification => notification.id !== id)
                    );
                }, []);
                return { notifications, markNotificationAsRead };
            });
            act(() => {
                result.current.markNotificationAsRead(1);
            });
            expect(result.current.notifications).toHaveLength(1);
            expect(result.current.notifications[0].id).toBe(2);
        });

        test('Should maintain reference equality between renders', () => {
            const { result, rerender } = renderHook(() => {
                const [notifications, setNotifications] = useState(mockNotifications);
                const markNotificationAsRead = useCallback((id) => {
                    setNotifications(prev =>
                        prev.filter(notification => notification.id !== id)
                    );
                }, []);
                return { notifications, markNotificationAsRead };
            });
            const firstReference = result.current.markNotificationAsRead;
            rerender();
            expect(result.current.markNotificationAsRead).toBe(firstReference);
        });
    });
});

describe('App Component Type Tests', () => {
    test('Should verify that App is a functional component', () => {
        function getComponentType(component) {
            if (typeof component !== 'function') {
                return
            }
            if (component.prototype?.isReactComponent) {
                return 'class component';
            }
            return 'functional component';
        }
        expect(typeof App).toBe('function');
        expect(App.prototype?.isReactComponent).toBeUndefined();
        const componentType = getComponentType(App);
        expect(componentType).toBe('functional component');
        expect(() => {
            const element = React.createElement(App);
            expect(React.isValidElement(element)).toBe(true);
        }).not.toThrow();
    });
});

describe('App Component Tests', () => {
    const mockNotificationsResponse = {
        data: {
            notifications: [
                { id: 1, type: 'default', value: 'New course available' },
                { id: 2, type: 'urgent', value: 'New resume available' },
                { id: 3, type: 'urgent', html: { __html: getLatestNotification() } }
            ]
        }
    };

    beforeEach(() => mockAxios.reset());
    afterEach(() => mockAxios.reset());

    test('Verify notification item deletion', async () => {
        const user = userEvent.setup();
        mockAxios.get.mockImplementationOnce(() => Promise.resolve(mockNotificationsResponse));
        render(<App />);
        await waitFor(async () => {
            await expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();
            const listItems = screen.getAllByRole('listitem');
            expect(listItems).toHaveLength(3);
        });
        expect(screen.getByText('New course available')).toBeInTheDocument();
        expect(screen.getByText('New resume available')).toBeInTheDocument();
        expect(screen.getByText((content, element) => {
            return element.textContent === 'Urgent requirement - complete by EOD';
        })).toBeInTheDocument();
        await user.click(screen.getByText('New course available'));
        await waitFor(() => {
            expect(screen.queryByText('New course available')).not.toBeInTheDocument();
            expect(screen.getAllByRole('listitem')).toHaveLength(2);
        });
        const notificationCalls = mockAxios.get.mock.calls.filter(
            call => call[0].includes('notifications')
        );
        expect(notificationCalls).toHaveLength(1);
    });
});

describe('App Component Performance with useCallback', () => {
    let originalConsoleError;
    let useCallbackSpy;
    const mockNotificationsResponse = {
        data: {
            notifications: [
                { id: 1, type: 'default', value: 'New course available' },
                { id: 2, type: 'urgent', value: 'New resume available' },
                { id: 3, type: 'urgent', html: { __html: getLatestNotification() } }
            ]
        }
    };

    beforeEach(() => {
        useCallbackSpy = jest.spyOn(React, 'useCallback');
        mockAxios.get.mockResolvedValue({
            data: {
                notifications: mockNotificationsResponse,
                courses: [],
            },
        });
        originalConsoleError = console.error;
        console.error = jest.fn();
    });

    afterEach(() => {
        useCallbackSpy.mockRestore();
        mockAxios.reset();
        console.error = originalConsoleError;
    });

    test('HandleDisplayDrawer should maintain referential equality', async () => {
        const { rerender } = render(<App />);
        await waitFor(() => {
            expect(screen.getByText('School Dashboard')).toBeInTheDocument();
        });
        const initialCalls = useCallbackSpy.mock.calls;
        const displayDrawerCall = initialCalls.find((call) => {
            const functionString = call[0].toString();
            return functionString.includes('TOGGLE_DRAWER');
        });
        if (!displayDrawerCall) {
            throw new Error('handleDisplayDrawer is not using useCallback');
        }
        const initialHandler = displayDrawerCall[0];
        await act(async () => rerender(<App />));
        await waitFor(() => {
            expect(screen.getByText('School Dashboard')).toBeInTheDocument();
        });
        const laterCalls = useCallbackSpy.mock.calls;
        const laterDisplayDrawerCall = laterCalls.find((call) => {
            const functionString = call[0].toString();
            return functionString.includes('TOGGLE_DRAWER');
        });
        expect(initialHandler).toBe(laterDisplayDrawerCall[0]);
    });

    test('HandleHideDrawer should maintain referential equality', async () => {
        const { rerender } = render(<App />);
        await waitFor(() => {
            expect(screen.getByText('School Dashboard')).toBeInTheDocument();
        });
        const initialCalls = useCallbackSpy.mock.calls;
        const hideDrawerCall = initialCalls.find((call) => {
            const functionString = call[0].toString();
            return functionString.includes('TOGGLE_DRAWER');
        });
        if (!hideDrawerCall) {
            throw new Error('handleDisplayDrawer is not using useCallback');
        }
        const initialHandler = hideDrawerCall[0];
        await act(async () => rerender(<App />));
        await waitFor(() => {
            expect(screen.getByText('School Dashboard')).toBeInTheDocument();
        });
        const laterCalls = useCallbackSpy.mock.calls;
        const laterHideDrawerCall = laterCalls.find((call) => {
            const functionString = call[0].toString();
            return functionString.includes('TOGGLE_DRAWER');
        });
        expect(initialHandler).toBe(laterHideDrawerCall[0]);
    });

    test('MarkNotificationAsRead should maintain referential equality', async () => {
        const useCallbackSpy = jest.spyOn(React, 'useCallback');
        const { rerender } = render(<App />);
        const initialCalls = useCallbackSpy.mock.calls;
        const markAsReadCall = initialCalls.find((call) => {
            const functionString = call[0].toString();
            return functionString.includes('MARK_NOTIFICATION_READ');
        });
        if (!markAsReadCall) {
            throw new Error('markNotificationAsRead is not using useCallback');
        }
        const initialHandler = markAsReadCall[0];
        await act(async () => rerender(<App />));
        const laterCalls = useCallbackSpy.mock.calls;
        const laterMarkAsReadCall = laterCalls.find((call) => {
            const functionString = call[0].toString();
            return functionString.includes('MARK_NOTIFICATION_READ');
        });
        expect(initialHandler).toBe(laterMarkAsReadCall[0]);
    });

    test('Handlers should maintain functionality', async () => {
        const user = userEvent.setup()
        mockAxios.get.mockImplementationOnce(() => Promise.resolve(mockNotificationsResponse));
        render(<App />);
        await waitFor(async () => {
            await expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();
            const listItems = screen.getAllByRole('listitem');
            expect(listItems).toHaveLength(3);
        });
        user.click(screen.getByLabelText(/close/i));
        await waitFor(() => {
            expect(screen.queryByText(/here is the list of notifications/i)).toBe(null);
        });
        user.click(screen.getByText(/your notifications/i));
        await waitFor(() => {
            expect(screen.queryByText(/here is the list of notifications/i)).toBeVisible();
        });
    });
});

afterAll(() => {
    console.error = originalError;
    console.warn = originalWarn;
});
