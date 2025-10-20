import WithLogging from '../HOC/WithLogging';

function Login() {
  return (
    <div className="App-body flex flex-col p-5 pl-10 h-[45vh] border-t-4 border-[color:var(--main-color)]">
      <p className="text-xl">Login to access the full dashboard</p>
      <div className="mt-8 text-lg">
        <label htmlFor="email" className="pr-2">Email</label>
        <input type="email" name="user_email" id="email" className="border rounded" />
        <label htmlFor="password" className="pl-2 pr-2">Password</label>
        <input type="password" name="user_password" id="password" className="border rounded" />
        <button className="cursor-pointer border px-1 rounded ml-2">OK</button>
      </div>
    </div>
  );
}

const LoginWithLogging = WithLogging(Login)
export default LoginWithLogging;
