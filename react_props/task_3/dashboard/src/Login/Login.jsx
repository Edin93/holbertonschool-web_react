import './Login.css';

function Login() {
    return (
        <div className="App-login">
            <p>Login to access the full dashboard</p>
            <label htmlFor="email">Email</label>
            <input type="email" name="user_email" id="email" />
            <label htmlFor="password">Password</label>
            <input type="text" name="user_password" id="password" />
            <button role="button" type="submit">OK</button>
        </div>
    );
}

export default Login;
