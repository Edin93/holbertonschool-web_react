import { useDispatch } from 'react-redux';
import WithLogging from '../../components/HOC/WithLogging';
import useLogin from '../../hooks/useLogin';
import { login } from '../../features/auth/authSlice';
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  body: {
    display: "flex",
    flexDirection: "column",
    height: "60vh",
    padding: "20px 20px 20px 40px",
    borderTop: "5px red solid",
  },
  p: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "1.3rem",
  },
  form: {
    margin: "20px 0",
    fontSize: "1.2rem",
    fontFamily: "Roboto, sans-serif",
    display: "flex",
    flexDirection: "row",
    "@media (max-width: 900px)": {
      flexDirection: "column",
    },
  },
  label: {
    paddingRight: "10px",
    "@media (max-width: 900px)": {
      display: "block",
    },
  },
  input: {
    marginRight: "10px",
    "@media (max-width: 900px)": {
      display: "block",
      marginBottom: "10px",
      paddingBottom: "5px",
      paddingTop: "5px",
      fontSize: "20px",
      width: "100%",
      boxSizing: "border-box",
    },
  },
  button: {
    cursor: "pointer",
    "@media (max-width: 900px)": {
      display: "block",
      marginTop: "10px",
      paddingBottom: "5px",
      paddingTop: "5px",
      fontSize: "16px",
      width: "100%",
      boxSizing: "border-box",
    },
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
  } = useLogin((email, password) => dispatch(login({ email, password })));

  return (
    <form aria-label="form" onSubmit={handleLoginSubmit}>
      <div className={css(styles.body)}>
        <p className={css(styles.p)}>Login to access the full dashboard</p>
        <div className={css(styles.form)}>
          <label htmlFor="email" className={css(styles.label)}>Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className={css(styles.input)}
            value={email}
            onChange={handleChangeEmail}
          />
          <label htmlFor="password" className={css(styles.label)}>Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className={css(styles.input)}
            value={password}
            onChange={handleChangePassword}
          />
          <input
            type="submit"
            value="OK"
            className={css(styles.button)}
            disabled={!enableSubmit}
          />
        </div>
      </div>
    </form>
  );
}

export default WithLogging(Login);