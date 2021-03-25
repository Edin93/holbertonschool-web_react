import React, { Component, Fragment } from 'react';
import logo from '../assets/holberton_logo.jpg';
import { StyleSheet, css } from 'aphrodite';
import AppContext from '../App/AppContext';
import PropTypes from 'prop-types';

class Header extends Component {

	static contextType = AppContext;

	constructor(props) {
		super(props);
	};

	render() {

		const { user, logOut } = this.context;

		return (
			<div className={css(styles.appHeader)}>
				<img
					src={logo}
					alt="logo"
				/>
				<h1 className={css(styles.heading1)}>
					School dashboard
				</h1>
				{
					user.isLoggedIn &&
					<section id="logoutSection">
						<hr size="2" width="90%" />
						Welcome <b>{user.email}</b> <a href="#" onClick={() => logOut()}>(logout)</a>
					</section>
				}
			</div>
		);
	};
};

Header.propTypes = {
	user: PropTypes.object,
	logOut: PropTypes.func
};

Header.defaultProps = {
	user: {
		email: '',
		password: '',
		isLoggedIn: false,
	},
	logOut: () => this.logOut(),
};

const styles = StyleSheet.create({
	appHeader: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'left',
	},
	heading1: {
		margin: 'auto auto auto 0',
		color: `var(--holberton-red)`,
		// color: `var(${--holberton-red})`,
	},
});

export default Header;
