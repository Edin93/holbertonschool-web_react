import logo from '../assets/holberton-logo.jpg';

export default function Header() {
  return (
    <div className="App-header flex items-center py-2 max-[520px]:flex-col">
      <img src={logo} className="App-logo h-60 pointer-events-none max-[520px]:h-60" alt="holberton logo" />
      <h1 className="font-bold text-[color:var(--main-color)] text-5xl max-[520px]:text-5xl max-[520px]:mt-2 max-[435px]:text-4xl">
        School Dashboard
      </h1>
    </div>
  );
}
