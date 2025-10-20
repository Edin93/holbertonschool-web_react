import './App.css';
import Notifications from '../Notifications/Notifications';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import { getLatestNotification } from '../utils/utils';

const notificationsList = [
  { id:1, type:'default', value:'New course available' },
  { id:2, type:'urgent', value:'New resume available' },
  { id:3, type:'urgent', html:{ __html: getLatestNotification()} }
];

export default function App() {

  return (
    <>
      <Notifications notifications={notificationsList} />
      <div className='App'>
        <Header />
        <Login />
        <Footer />
      </div>
    </>
  );
}
