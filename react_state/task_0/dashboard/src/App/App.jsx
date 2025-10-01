import React from 'react';
import Notification from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from "../Login/Login"
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import { getLatestNotification } from '../utils/utils';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom'
import './App.css';

const notificationsList = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', html: { __html: getLatestNotification() } }
];

const coursesList = [
    { id: 1, name: 'ES6', credit: 60 },
    { id: 2, name: 'Webpack', credit: 20 },
    { id: 3, name: 'React', credit: 40 }
];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayDrawer: false,
        };
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeydown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeydown);
    }

    handleKeydown = (e) => {
        if (e.ctrlKey && e.key === "h") {
            alert("Logging you out");
            if (this.props.logOut) {
                this.props.logOut();
            }
        }
    }

    handleDisplayDrawer = () => {
        this.setState({ displayDrawer: true });
    };

    handleHideDrawer = () => {
        this.setState({ displayDrawer: false });
    };

    render() {
        const { isLoggedIn = false, logOut = () => { } } = this.props;
        const { displayDrawer } = this.state;

        return (
            <>
                <Notification notifications={notificationsList}
                    displayDrawer={displayDrawer}
                    handleDisplayDrawer={this.handleDisplayDrawer}
                    handleHideDrawer={this.handleHideDrawer} />
                <div className="App">
                    <Header />
                    {isLoggedIn ?
                        <BodySectionWithMarginBottom title="Course list">
                            <CourseList courses={coursesList} />
                        </BodySectionWithMarginBottom>
                        :
                        <BodySectionWithMarginBottom title='Log in to continue'>
                            <Login />
                        </BodySectionWithMarginBottom>
                    }
                    <BodySection>
                        News from the School
                        <p>Holberton School News goes here</p>
                    </BodySection>
                    <Footer />
                </div>
            </>
        );
    }
}

export default App;
