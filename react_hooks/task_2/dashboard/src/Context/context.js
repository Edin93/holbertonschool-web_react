import { createContext } from 'react';

const defaultUser = {
  email: '',
  password: '',
  isLoggedIn: false
};

const defaultLogOut = () => {};

const newContext = createContext({
  user: defaultUser,
  logOut: defaultLogOut
});

export default newContext;
