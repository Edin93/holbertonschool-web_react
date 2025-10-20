import logo from '../assets/holberton-logo.jpg';

export default function Header() {
  return (
    <div className="App-header flex items-center py-2">
      <img src={logo} className="App-logo h-60 pointer-events-none" alt="holberton logo" />
      <h1 className="font-bold text-[color:var(--main-color)] text-5xl">
        School Dashboard
      </h1>
    </div>
  );
}
