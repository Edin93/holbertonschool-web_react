import React, { Component, Fragment} from 'react';
import { StyleSheet, css, } from 'aphrodite';

class Login extends Component {
	render() {
		return (
			<Fragment>
				<div className={css(styles.loginBody)}>
					<p>
						Login to access the full dashboard
					</p>
					<label htmlFor="email">Email: </label>
					<input className={css(styles.input)} type="email" id="email" name="email" />
					<label htmlFor="password">Password: </label>
					<input className={css(styles.input)} type="password" id="password" name="password" />
					<button>OK</button>
				</div>
			</Fragment>
		);
	}
};

const styles = StyleSheet.create({
	loginBody: {
		padding: '36px 24px',
	},
	input: {
		margin: '0 16px 0 8px',
	},
});

export default Login;
