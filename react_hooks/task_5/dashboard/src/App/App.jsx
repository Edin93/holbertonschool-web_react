import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import Notification from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from "../Login/Login";
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import { getLatestNotification } from '../utils/utils';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import BodySection from '../BodySection/BodySection';
import { newContext } from '../Context/context';
import './App.css';

function App() {
  const [displayDrawer, setDisplayDrawer] = useState(true);
  const [user, setUser] = useState({ ...newContext.user });
  const [notifications, setNotifications] = useState([]);
  const [courses, setCourses] = useState([]);

  const handleDisplayDrawer = useCallback(() => {
    setDisplayDrawer(true);
  }, []);

  const handleHideDrawer = useCallback(() => {
    setDisplayDrawer(false);
  }, []);

  const logIn = (email, password) => {
    setUser({
      email,
      password,
      isLoggedIn: true,
    });
    console.log("user", user);
  };

  const logOut = () => {
    setUser({
      email: '',
      password: '',
      isLoggedIn: false,
    });
    setCourses([]);
  };

  const markNotificationAsRead = useCallback((id) => {
    console.log(`Notification ${id} has been marked as read`);
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:5173/notifications.json');
        const fetchedNotifications = response.data.notifications.map((notif) => {
          if (notif.html && notif.html.__html === "") {
            notif.html.__html = getLatestNotification();
          }
          return notif;
        });
        setNotifications(fetchedNotifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    fetchNotifications();
  }, []);

  useEffect(() => {
    if (user.isLoggedIn) {
      const fetchCourses = async () => {
        try {
          const response = await axios.get('http://localhost:5173/courses.json');
          setCourses(response.data.courses);
          
        } catch (error) {
          console.error('Error fetching courses:', error);
        }
      };
      fetchCourses();
    }
  }, [user.isLoggedIn]);

  return (
    <newContext.Provider value={{ user, logOut }}>
      <Notification
        notifications={notifications}
        displayDrawer={displayDrawer}
        handleDisplayDrawer={handleDisplayDrawer}
        handleHideDrawer={handleHideDrawer}
        markNotificationAsRead={markNotificationAsRead}
      />
      <div className="App">
        <Header />
        {user.isLoggedIn ? (
          <BodySectionWithMarginBottom title="Course list">
            <CourseList courses={courses} />
          </BodySectionWithMarginBottom>
        ) : (
          <BodySectionWithMarginBottom title="Log in to continue">
            <Login
              login={logIn}
              email={user.email}
              password={user.password}
            />
          </BodySectionWithMarginBottom>
        )}
        <BodySection title="News from the School">
          <p>Holberton School news goes here</p>
        </BodySection>
        <Footer />
      </div>
    </newContext.Provider>
  );
}

export default App;
