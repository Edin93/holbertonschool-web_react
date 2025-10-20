import logo from "../assets/holberton-logo.jpg";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    height: "30vmin",
    pointerEvents: "none",
  },
  h1: {
    color: "#e1003c",
    fontFamily: "Roboto, sans-serif",
    fontWeight: "bold",
    fontSize: "2.5rem",
    margin: 0,
  },
  a: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "1.2rem",
    marginLeft: "auto",
    cursor: "pointer",
  },
});

export default function Header({ user, logOut }) {
  return (
    <div className={css(styles.header)}>
      <img src={logo} className={css(styles.logo)} alt="holberton logo" />
      <h1 className={css(styles.h1)}>School Dashboard</h1>
      {user.isLoggedIn ? (
        <div id="logoutSection" className={css(styles.logoutSection)}>
          Welcome <b>{user.email}</b> <a className={css(styles.a)} href="#" onClick={logOut}>(logout)</a>
        </div>
      ) : null}
    </div>
  );
}
