import HolbertonLogo from './assets/holberton-logo.jpg';
import './App.css'
function App() {
  return (
    <div className="App">
      <div className='App-header'>
        <img className='App-logo' src={HolbertonLogo} alt='holberton logo'></img>
        <h1>School dashboard</h1>
      </div>
      <div className='App-body'>
        <p>Login to access the full dashboard</p>
      </div>
      <div className='App-footer'>
        <p>Copyright 2025 - holberton School</p>
      </div>
    </div>
  );
}

export default App;