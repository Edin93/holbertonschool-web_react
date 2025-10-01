import { useState } from 'react';

export default function useLogin({ onLogin }) {
    const [enableSubmit, setEnableSubmit] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const handleChangeEmail = (e) => {
        const newEmail = e.target.value;
        const { password } = formData;
        setFormData(prev => ({
            ...prev,
            email: newEmail
        }));
        setEnableSubmit(validateEmail(newEmail) && password.length >= 8);
    };
    const handleChangePassword = (e) => {
        const newPassword = e.target.value;
        const { email } = formData;
        setFormData(prev => ({
            ...prev,
            password: newPassword
        }));
        setEnableSubmit(validateEmail(email) && newPassword.length >= 8);
    };
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        onLogin(formData.email, formData.password);
    };
    return {
        email: formData.email,
        password: formData.password,
        enableSubmit,
        handleChangeEmail,
        handleChangePassword,
        handleLoginSubmit
    };
}
