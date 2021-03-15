import React, { Component, Fragment} from 'react';
import { StyleSheet, css, } from 'aphrodite';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			enableSubmit: false,
			email: '',
			password: '',
		};
		this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
		this.handleChangeEmail = this.handleChangeEmail.bind(this);
		this.handleChangePassword = this.handleChangePassword.bind(this);
	};

	handleLoginSubmit() {
		const { email, password } = this.state;
		this.props.logIn(email, password);
	};

	handleChangeEmail(event) {
		let pw = this.state.password;
		this.setState({
			[event.target.name]: event.target.value,
			enableSubmit: ((event.target.value.length > 0) && (pw.length > 0)) ? true : false,
		});
	};
	
	handleChangePassword(event) {
		let email = this.state.email;
		this.setState({
			[event.target.name]: event.target.value,
			enableSubmit: ((event.target.value.length > 0) && (email.length > 0)) ? true : false,
		});
	};

	render() {
		return (
			<Fragment>
				<div className={css(styles.loginBody)}>
					<p>
						Login to access the full dashboard
					</p>
					<form onSubmit={this.handleLoginSubmit}>
						<div className={css(styles.inputContainer)}>
							<label htmlFor="email">Email: </label>
							<input className={css(styles.input)} type="email" id="email" name="email" onChange={this.handleChangeEmail} />
						</div>
						<div className={css(styles.inputContainer)}>
							<label htmlFor="password">Password: </label>
							<input className={css(styles.input)} type="password" id="password" name="password" onChange={this.handleChangePassword} />
						</div>
						<div className={css(styles.inputContainer)}>
							<input type="submit" value="submit" disabled={!this.state.enableSubmit}/>
						</div>
					</form>
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
