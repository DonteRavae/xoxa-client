// REMIX
import { Outlet, useMatches } from "@remix-run/react";
// INTERNAL
import { UserProfileSnapshot } from "../../../data/types";
import ProfilePicture from "../../../components/ProfilePicture/ProfilePicture";
// STYLES
import styles from "../../styles/xcLayout.module.css";

export default function XoxaCommunityLayout() {
  const matches = useMatches();
  const userProfile = matches[0].data as UserProfileSnapshot | null;

  return (
    <main id={styles["xc-container"]}>
      <header className={styles["layout-header"]}>
        <div className={styles["cover-img-container"]}>
          <img
            className={styles["cover-img"]}
            src="https://scontent-atl3-1.xx.fbcdn.net/v/t1.6435-9/121487377_10218645395874792_879119094289990046_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=86c6b0&_nc_ohc=Grtr26kFGT0Q7kNvgGoXJvp&_nc_zt=23&_nc_ht=scontent-atl3-1.xx&_nc_gid=Af8pW4FUcY2aQeUxh3jaW7d&oh=00_AYA-0Hfdqyd71RgUv_3wPf1lDnfukzhsn0rLYrOhC-7UBw&oe=6791173E"
            alt="Profile Cover Art"
          />
        </div>
        <div className={styles["mini-bio"]}>
          <ProfilePicture userProfile={userProfile} />
          <div className={styles["name-and-title"]}>
            <h1 className={styles.username}>{userProfile?.username}</h1>
            <p className={styles.title}>Job Title</p>
          </div>
        </div>
      </header>
      <Outlet />
    </main>
  );
}
