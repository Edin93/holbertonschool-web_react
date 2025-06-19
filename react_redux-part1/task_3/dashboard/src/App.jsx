import { useEffect, useCallback, useReducer } from 'react';
import axios from 'axios';
import Notifications from './components/Notifications/Notifications';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Login from './pages/Login/Login';
import CourseList from './pages/CourseList/CourseList';
import { getLatestNotification } from './utils/utils';
import BodySectionWithMarginBottom from './components/BodySectionWithMarginBottom/BodySectionWithMarginBottom';
import BodySection from './components/BodySection/BodySection';
import { appReducer, APP_ACTIONS, initialState } from './appReducer';

const API_BASE_URL = 'http://localhost:5173';
const ENDPOINTS = {
    courses: `${API_BASE_URL}/courses.json`,
    notifications: `${API_BASE_URL}/notifications.json`,
};

export default function App() {
    const [state, dispatch] = useReducer(appReducer, initialState);
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(ENDPOINTS.notifications);
                const latestNotif = {
                    id: 3,
                    type: "urgent",
                    html: { __html: getLatestNotification() }
                };
                const currentNotifications = response.data.notifications;
                const indexToReplace = currentNotifications.findIndex(
                    notification => notification.id === 3
                );
                const updatedNotifications = [...currentNotifications];
                if (indexToReplace !== -1) {
                    updatedNotifications[indexToReplace] = latestNotif;
                } else {
                    updatedNotifications.push(latestNotif);
                }
                dispatch({
                    type: APP_ACTIONS.SET_NOTIFICATIONS,
                    payload: updatedNotifications
                });
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };
        fetchNotifications();
    }, []);
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(ENDPOINTS.courses);
                dispatch({
                    type: APP_ACTIONS.SET_COURSES,
                    payload: response.data.courses
                });
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };
        fetchCourses();
    }, [state.user.isLoggedIn]);
    const handleDisplayDrawer = useCallback(() => {
        dispatch({ type: APP_ACTIONS.TOGGLE_DRAWER });
    }, []);
    const handleHideDrawer = useCallback(() => {
        dispatch({ type: APP_ACTIONS.TOGGLE_DRAWER });
    }, []);
    const logIn = (email, password) => {
        dispatch({
            type: APP_ACTIONS.LOGIN,
            payload: { email, password }
        });
    };
    const logOut = () => {
        dispatch({ type: APP_ACTIONS.LOGOUT });
    };
    const markNotificationAsRead = useCallback((id) => {
        dispatch({
            type: APP_ACTIONS.MARK_NOTIFICATION_READ,
            payload: id
        });
        console.log(`Notification ${id} has been marked as read`);
    }, []);
    return (
        <>
            <Notifications
                notifications={state.notifications}
                handleHideDrawer={handleHideDrawer}
                handleDisplayDrawer={handleDisplayDrawer}
                displayDrawer={state.displayDrawer}
                markNotificationAsRead={markNotificationAsRead}
            />
            <>
                <Header user={state.user} logOut={logOut} />
                {!state.user.isLoggedIn ? (
                    <BodySectionWithMarginBottom title='Log in to continue'>
                        <Login login={logIn} />
                    </BodySectionWithMarginBottom>
                ) : (
                    <BodySectionWithMarginBottom title='Course list'>
                        <CourseList courses={state.courses} />
                    </BodySectionWithMarginBottom>
                )}
                <BodySection title="News from the School">
                    <p>Holberton School news goes here</p>
                </BodySection>
            </>
            <Footer user={state.user} />
        </>
    );
};

