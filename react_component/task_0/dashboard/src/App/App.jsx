import { Component } from 'react';
import './App.css';
import Notifications from '../Notifications/Notifications';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import CourseList from '../CourseList/CourseList';
import { getLatestNotification } from '../utils/utils';

const notificationsList = [
  { id:1, type:'default', value:'New course available' },
  { id:2, type:'urgent', value:'New resume available' },
  { id:3, type:'urgent', html:{ __html: getLatestNotification()} }
];

const coursesList = [
  { id:1, name:'ES6', credit:60 },
  { id:2, name:'Webpack', credit:20 },
  { id:3, name:'React', credit:40 }
];

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <>
        <Notifications notifications={notificationsList} />
        <>
          <Header />
          {
            !isLoggedIn ? (
              <Login />
            ) : (
              <CourseList courses={coursesList} />
            )
          }
        </>
        <Footer />
      </>
    );
  }
}

export default App;
