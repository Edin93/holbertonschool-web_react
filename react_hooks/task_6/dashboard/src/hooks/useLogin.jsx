import { useState } from 'react';

const useLogin = ({ onLogin }) => {
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
    onLogin(email, password);
  };

  return {
    email: formData.email,
    password: formData.password,
    enableSubmit,
    handleChangeEmail,
    handleChangePassword,
    handleLoginSubmit,
  };
};

export default useLogin;