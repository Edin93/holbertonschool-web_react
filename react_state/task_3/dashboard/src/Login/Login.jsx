import { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import WithLogging from '../HOC/WithLogging';

const styles = StyleSheet.create({
  body: {
    display: 'flex',
    flexDirection: 'column',
    height: '60vh',
    padding: '20px 20px 20px 40px',
    borderTop: '5px red solid'
  },
  p: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '1.3rem'
  },
  form: {
    margin: '20px 0',
    fontSize: '1.2rem',
    fontFamily: 'Roboto, sans-serif',
    display: 'flex',
    flexDirection: 'row',
    '@media (max-width: 900px)': {
      flexDirection: 'column',
    }
  },
  label: {
    paddingRight: '10px',
    '@media (max-width: 900px)': {
      display: 'block'
    }
  },
  input: {
    marginRight: '10px',
    '@media (max-width: 900px)': {
      display: 'block',
      marginBottom: '10px',
      paddingBottom: '5px',
      paddingTop: '5px',
      fontSize: '20px',
      width: '100%',
      boxSizing: 'border-box'
    }
  },
  button: {
    cursor: 'pointer',
    '@media (max-width: 900px)': {
      display: 'block',
      marginTop: '10px',
      paddingBottom: '5px',
      paddingTop: '5px',
      fontSize: '16px',
      width: '100%',
      boxSizing: 'border-box'
    }
  }
});

class Login extends Component {
  constructor(props) {
    super(props);
    const { email = '', password = '' } = this.props;
    this.state = {
      email,
      password,
      enableSubmit: false
    };
  }

  isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validateForm = (email, password) => {
    const isEmailValid = this.isValidEmail(email);
    const isPasswordValid = password.length >= 8;
    return isEmailValid && isPasswordValid && email !== '' && password !== '';
  }

  handleChangeEmail = (e) => {
    const email = e.target.value;
    this.setState({
      email,
      enableSubmit: this.validateForm(email, this.state.password)
    });
  }

  handleChangePassword = (e) => {
    const password = e.target.value;
    this.setState({
      password,
      enableSubmit: this.validateForm(this.state.email, password)
    });
  }

  handleLoginSubmit = (e) => {
    e.preventDefault();
    const { logIn } = this.props;
    if (logIn) {
      logIn(this.state.email, this.state.password);
    }
  }

  render() {
    const { email, password, enableSubmit } = this.state;

    return (
      <div className={css(styles.body)}>
        <p className={css(styles.p)}>Login to access the full dashboard</p>
        <form className={css(styles.form)} onSubmit={this.handleLoginSubmit}>
          <label htmlFor="email" className={css(styles.label)}>Email</label>
          <input
            type="email"
            name="user_email"
            id="email"
            className={css(styles.input)}
            value={email}
            onChange={this.handleChangeEmail}
          />
          <label htmlFor="password" className={css(styles.label)}>Password</label>
          <input
            type="password"
            name="user_password"
            id="password"
            className={css(styles.input)}
            value={password}
            onChange={this.handleChangePassword}
          />
          <input
            type="submit"
            value="OK"
            className={css(styles.button)}
            disabled={!enableSubmit}
          />
        </form>
      </div>
    );
  }
}

const LoginWithLogging = WithLogging(Login)
export default LoginWithLogging;
