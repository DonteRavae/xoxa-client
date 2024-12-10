// REACT
import { useMemo } from "react";
// REMIX
import { Link, useLoaderData, useLocation } from "@remix-run/react";
// INTERNAL;
import { loader } from "../../root";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
// EXTERNAL
import {
  faBell,
  faLayerGroup,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// STYLES
import styles from "./ApplicationHeader.module.css";

export default function ApplicationHeader() {
  const location = useLocation();
  const isUrlAnAccessRoute = useMemo(() => {
    const path = location.pathname;
    return path === "/register" || path === "/login";
  }, [location]);

  const snapshot = useLoaderData<typeof loader>();

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
          {!snapshot ? (
            <Link id={styles["login-button"]} to="/login">
              Log In
            </Link>
          ) : (
            <div id={styles["account-navigation-control"]}>
              <button title="Show communities" aria-label="Show communities">
                <FontAwesomeIcon icon={faLayerGroup} />
              </button>
              <button title="Open chat" aria-label="Open chat">
                <FontAwesomeIcon icon={faMessage} />
              </button>
              <button
                title="Show notifications"
                aria-label="Show notifications"
              >
                <FontAwesomeIcon icon={faBell} />
              </button>
              <ProfilePicture img_url="https://xsgames.co/randomusers/avatar.php?g=male" />
            </div>
          )}
        </nav>
      )}
    </header>
  );
}
