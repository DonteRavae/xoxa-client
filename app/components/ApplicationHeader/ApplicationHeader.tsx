// REACT
import { useMemo, useState } from "react";
// REMIX
import { Link, useLoaderData, useLocation } from "@remix-run/react";
// INTERNAL;
import { loader } from "../../root";
import { UserProfileSnapshot } from "../../data/types";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import DropdownMenu, { DropdownOptions } from "./components/Dropdowns";
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

  const userProfile: UserProfileSnapshot | null = useLoaderData<typeof loader>();

  const [showCommunities, setShowCommunities] = useState<boolean>(false);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);

  const openDropdownMenu = (dropdown: DropdownOptions) => {
    if (dropdown === DropdownOptions.Community) {
      setShowCommunities((show) => !show);
      setShowNotifications(false);
      return;
    }

    setShowNotifications((show) => !show);
    setShowCommunities(false);
  };

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
          {!userProfile ? (
            <Link id={styles["login-button"]} to="/login">
              Log In
            </Link>
          ) : (
            <>
              <div id={styles["account-navigation-control"]}>
                <button
                  title="Show communities"
                  aria-label="Show communities"
                  onClick={() => openDropdownMenu(DropdownOptions.Community)}
                >
                  <FontAwesomeIcon icon={faLayerGroup} />
                </button>
                <button title="Open chat" aria-label="Open chat">
                  <FontAwesomeIcon icon={faMessage} />
                </button>
                <button
                  title="Show notifications"
                  aria-label="Show notifications"
                  onClick={() => openDropdownMenu(DropdownOptions.Notification)}
                >
                  <FontAwesomeIcon icon={faBell} />
                </button>
                <ProfilePicture userProfile={userProfile}/>

                {/* DROPDOWN MENUS */}
                {showCommunities && (
                  <DropdownMenu kind={DropdownOptions.Community}>
                    {[].length ? (
                      <ul></ul>
                    ) : (
                      <p className={styles["empty-message"]}>
                        {
                          "It's looking pretty empty around here. Join a community!"
                        }
                      </p>
                    )}
                    <ul></ul>
                  </DropdownMenu>
                )}

                {showNotifications && (
                  <DropdownMenu kind={DropdownOptions.Notification}>
                    {[].length ? (
                      <ul></ul>
                    ) : (
                      <p className={styles["empty-message"]}>
                        No new notifications.
                      </p>
                    )}
                  </DropdownMenu>
                )}
              </div>
              {(showNotifications || showCommunities) && (
                <button
                  className={styles.overlay}
                  onClick={() => {
                    setShowCommunities(false);
                    setShowNotifications(false);
                  }}
                />
              )}
            </>
          )}
        </nav>
      )}
    </header>
  );
}
