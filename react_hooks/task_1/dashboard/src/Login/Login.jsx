import { useState } from 'react';
import WithLogging from '../HOC/WithLogging';
import './Login.css';

const Login = ({ login }) => {

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [enableSubmit, setEnableSubmit] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChangeEmail = (e) => {
    const email = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      email,
    }));
    setEnableSubmit(validateEmail(email) && formData.password.length >= 8);
  };

  const handleChangePassword = (e) => {
    const password = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      password,
    }));
    setEnableSubmit(validateEmail(formData.email) && password.length >= 8);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    login(email, password);
  };

  return (
    <form aria-label="form" onSubmit={handleLoginSubmit}>
      <div className="App-body">
        <p>Login to access the full dashboard</p>
        <div className="form">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="user_email"
            id="email"
            value={formData.email}
            onChange={handleChangeEmail}
          />
          <label htmlFor="password">Password: </label>
          <input
            type="text"
            name="user_password"
            id="password"
            value={formData.password}
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
