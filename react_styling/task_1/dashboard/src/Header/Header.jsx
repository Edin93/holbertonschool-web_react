import './Header.css';
import logo from '../assets/holberton-logo.jpg';

function Header() {
  return (
    <div className="App-header">
      <img src={logo} className="App-logo" alt="holberton logo" />
      <h1>School Dashboard</h1>
    </div>
  )
}

export default Header;
