import { useDispatch } from 'react-redux';
import WithLogging from '../../components/HOC/WithLogging';
import useLogin from '../../hooks/useLogin';
import { StyleSheet, css } from 'aphrodite';
import { login } from '../../features/auth/authSlice';


const styles = StyleSheet.create({
  body: {
    display: 'flex',
    flexDirection: 'column',
    height: '60vh',
    padding: '20px 20px 20px 40px',
    borderTop: '5px solid red',
    fontFamily: 'Roboto, sans-serif',
  },
  paragraph: {
    fontSize: '1.3rem',
    margin: 0,
  },
  form: {
    margin: '20px 0',
    fontSize: '1.2rem',
  },
  label: {
    paddingRight: '10px',
  },
  input: {
    marginRight: '10px',
  },
  button: {
    cursor: 'pointer',
  },
});


function Login() {
    const dispatch = useDispatch();
    const {
        email,
        password,
        enableSubmit,
        handleChangeEmail,
        handleChangePassword,
        handleLoginSubmit
    } = useLogin({
        onLogin: (email, password) => dispatch(login({ email, password }))
    });

    return (
        <form aria-label="form" onSubmit={handleLoginSubmit}>
            <div className={css(styles.body)}>
                <p className={css(styles.paragraph)}>Login to access the full dashboard</p>
                <div className={css(styles.form)}>
                    <label htmlFor="email" className={css(styles.label)}>Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={handleChangeEmail}
                        className={css(styles.input)}
                    />
                    <label htmlFor="password" className={css(styles.label)}>Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={handleChangePassword}
                         className={css(styles.input)}
                    />
                    <input
                        type="submit"
                        value="OK"
                        disabled={!enableSubmit}
                        className={css(styles.button)}
                    />
                </div>
            </div>
        </form>
    );
}

export default WithLogging(Login);
