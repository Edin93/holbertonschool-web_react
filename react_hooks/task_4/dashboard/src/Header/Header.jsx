import { useContext } from 'react';
import './Header.css';
import HolbertonLogo from '../assets/holbertonlogo.jpg';
import { newContext } from '../Context/context';

const Header = () => {
  const { user, logOut } = useContext(newContext);

  return (
    <div className="App-header">
      <img className="App-logo" src={HolbertonLogo} alt="holberton logo" />
      <h1>School dashboard</h1>
      {user.isLoggedIn && (
        <div id="logoutSection">
           Welcome <b>{user.email}</b> (<a href="" onClick={logOut}>logout</a>)
        </div>
      )}
    </div>
  );
};

export default Header;
