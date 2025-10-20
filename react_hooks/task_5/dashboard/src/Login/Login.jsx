import { StyleSheet, css } from "aphrodite";
import WithLogging from "../HOC/WithLogging";
import useLogin from "../hooks/useLogin";

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

const Login = ({ logIn }) => {
  const {
    email,
    password,
    enableSubmit,
    handleChangeEmail,
    handleChangePassword,
    handleLoginSubmit
  } = useLogin(logIn);

  return (
    <div className={css(styles.body)}>
      <p className={css(styles.p)}>Login to access the full dashboard</p>
      <form className={css(styles.form)} onSubmit={handleLoginSubmit}>
        <label htmlFor="email" className={css(styles.label)}>
          Email
        </label>
        <input
          type="email"
          name="user_email"
          id="email"
          className={css(styles.input)}
          value={email}
          onChange={handleChangeEmail}
        />
        <label htmlFor="password" className={css(styles.label)}>
          Password
        </label>
        <input
          type="password"
          name="user_password"
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
      </form>
    </div>
  );
}

export default WithLogging(Login);
