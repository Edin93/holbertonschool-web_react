import React from 'react';
import logo from '../assets/holberton_logo.jpg';
import { StyleSheet, css } from 'aphrodite';

function Header() {
	return (
		<div className={css(styles.appHeader)}>
			<img
				src={logo}
				alt="logo"
			/>
			<h1 className={css(styles.heading1)}>
				School dashboard
			</h1>
		</div>
	);
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
