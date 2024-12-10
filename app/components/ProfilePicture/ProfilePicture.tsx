import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./ProfilePicture.module.css";

interface ProfilePicProps {
  img_url?: string;
  group?: boolean;
}

export default function ProfilePicture({ img_url, group }: ProfilePicProps) {
  if (group)
    return (
      <div className={styles["group-pfp"]}>
        <FontAwesomeIcon icon={faUserGroup} />
      </div>
    );
  return <img className={styles.pfp} src={img_url} alt="Profile Avatar" />;
}
