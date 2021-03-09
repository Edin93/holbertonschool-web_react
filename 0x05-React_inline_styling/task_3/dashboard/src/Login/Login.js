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
					<div className={css(styles.inputContainer)}>
						<label htmlFor="email">Email: </label>
						<input className={css(styles.input)} type="email" id="email" name="email" />
					</div>
					<div className={css(styles.inputContainer)}>
						<label htmlFor="password">Password: </label>
						<input className={css(styles.input)} type="password" id="password" name="password" />
					</div>
					<div className={css(styles.inputContainer)}>
						<button>OK</button>
					</div>
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
	inputContainer: {
		display: 'inline',
		'@media (max-width: 900px)': {
			display: 'block',
		},
	},
});

// const styles = StyleSheet.create({
// 	loginBody: {
// 		padding: '36px 24px',
// 	},
// 	input: {
// 		margin: '0 16px 0 8px',
// 	},
// });

export default Login;
