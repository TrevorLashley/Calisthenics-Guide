import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const [cookies, removeCookie] = useCookies();
  const navigate = useNavigate();

  const logout = () => {
    removeCookie("token");
    navigate("/");
  };

  const styles = {
    nav: {
      padding: "10px 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    ul: {
      listStyle: "none",
      display: "flex",
      margin: 0,
      padding: 0,
    },
    li: {
      margin: "0 15px",
    },
    link: {
      textDecoration: "none",
      fontSize: "16px",
      color: "inherit",
    },
    logout: {
      cursor: "pointer",
      textDecoration: "none",
      fontSize: "16px",
      color: "inherit",
    },
  };

  return (
    <nav style={styles.nav}>
      <ul style={styles.ul}>
        <li style={styles.li}>
          <Link to="/" style={styles.link}>
            Home
          </Link>
        </li>
        {cookies.token ? (
          <div style={styles.ul}>
            <li style={styles.li}>
              <Link to="/your-exercises" style={styles.link}>
                Your Exercises
              </Link>
            </li>
            <li style={styles.li}>
              <a href="#!" onClick={logout} style={styles.logout}>
                Logout
              </a>
            </li>
          </div>
        ) : (
          <div style={styles.ul}>
            <li style={styles.li}>
              <Link to="/signup" style={styles.link}>
                Sign Up
              </Link>
            </li>
            <li style={styles.li}>
              <Link to="/login" style={styles.link}>
                Log in
              </Link>
            </li>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
