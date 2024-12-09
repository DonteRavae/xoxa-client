// REACT
import { useMemo } from "react";
// REMIX
import { Link, useLocation } from "@remix-run/react";
// STYLES
import styles from "./ApplicationHeader.module.css";

export default function ApplicationHeader() {
  const location = useLocation();
  const isUrlAnAccessRoute = useMemo(() => {
    const path = location.pathname;
    return path === "/register" || path === "/login";
  }, [location]);

  return (
    <header id={styles["application-header"]}>
      <Link to="/">
        <img className={styles.logo} src="" alt="Xoxa Logo" />
      </Link>
      {!isUrlAnAccessRoute && (
        <nav>
          <Link to="/wiki">Wiki</Link>
          <Link to="/collab">Collab</Link>
          <Link to="/recruiting">Recruiting</Link>
          <Link id={styles["login-button"]} to="/login">
            Log In
          </Link>
        </nav>
      )}
    </header>
  );
}
