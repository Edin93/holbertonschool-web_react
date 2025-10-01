import React from 'react';

export const user = {
    email: '',
    password: '',
    isLoggedIn: false,
};

const logOut = () => { };

export const newContext = React.createContext({ user, logOut });
