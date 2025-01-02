// REMIX
import { Link } from "@remix-run/react";
// EXTERNAL
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// INTERNAL
import { UserProfileSnapshot } from "../../data/types";
// STYLES
import styles from "./ProfilePicture.module.css";

interface ProfilePicProps {
  userProfile: UserProfileSnapshot | null;
  group?: boolean;
}

export default function ProfilePicture({
  userProfile,
  group,
}: ProfilePicProps) {
  if (group)
    return (
      <div className={styles["group-pfp"]}>
        <FontAwesomeIcon icon={faUserGroup} />
      </div>
    );

  return (
    <Link className={styles.pfp} to={`/xc/profile/${userProfile?.username}`}>
      <img src={userProfile?.img_url} alt="Profile Avatar" />
    </Link>
  );
}
