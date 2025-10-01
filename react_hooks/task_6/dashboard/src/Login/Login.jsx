import React from 'react';
import WithLogging from '../HOC/WithLogging';
import useLogin from '../hooks/useLogin';
import './Login.css';

const Login = ({ login }) => {
  const {
    email,
    password,
    enableSubmit,
    handleChangeEmail,
    handleChangePassword,
    handleLoginSubmit,
  } = useLogin({
    onLogin: login
  });;

  return (
    <form aria-label="form" onSubmit={handleLoginSubmit}>
      <div className="App-body">
        <p>Login to access the full dashboard</p>
        <div className="form">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="user_email"
            id="email"
            value={email}
            onChange={handleChangeEmail}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="user_password"
            id="password"
            value={password}
            onChange={handleChangePassword}
          />
          <input value="OK" type="submit" disabled={!enableSubmit} />
        </div>
      </div>
    </form>
  );
};

const LoginWithLogging = WithLogging(Login);
export default LoginWithLogging;