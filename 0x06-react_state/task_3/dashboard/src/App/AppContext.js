import React from "react";

let user = {
	email: '',
	password: '',
	isLoggedIn: false,
};

let logOut = () => {};

let AppContext = React.createContext({
	user,
	logOut,
});

export default AppContext;
