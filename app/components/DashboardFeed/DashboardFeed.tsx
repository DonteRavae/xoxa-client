// REACT
import { useRef, useState } from "react";
// REMIX
import { useMatches } from "@remix-run/react";
// EXTERNAL
import { faAngleDown, faCamera, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// INTERNAL
import Modal from "../Modal/Modal";
import { UserProfileSnapshot } from "../../data/types";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import CreatePostForm from "../CreatePostForm/CreatePostForm";
// STYLES
import styles from "./DashboardFeed.module.css";

enum ActiveTab {
  Personal,
  Community,
}

export default function DashboardFeed() {
  const matches = useMatches();
  const userProfile = matches[0].data as UserProfileSnapshot | null;
  const modalRef = useRef<HTMLDialogElement>(null);
  const [activeFeed, setActiveFeed] = useState<ActiveTab>(ActiveTab.Personal);
  const [isNewPostAnImage, setIsNewPostAnImage] = useState<boolean>(false);

  return (
    <div id={styles["feed-container"]}>
      <nav id={styles["feed-tabs"]}>
        <button
          className={`${styles.tabs} ${
            activeFeed === ActiveTab.Personal ? styles.active : ""
          }`}
          onClick={() => setActiveFeed(ActiveTab.Personal)}
        >
          People You Follow
        </button>
        <button
          className={`${styles.tabs} ${
            activeFeed === ActiveTab.Community ? styles.active : ""
          }`}
          onClick={() => setActiveFeed(ActiveTab.Community)}
        >
          Communities You Follow
        </button>
      </nav>
      <div className={styles["create-post-action"]}>
        <ProfilePicture userProfile={userProfile} />
        <input
          placeholder="What's on your mind?"
          readOnly
          onClick={() => {
            setIsNewPostAnImage(false);
            modalRef?.current?.showModal();
          }}
        />
        <button
          type="button"
          onClick={() => {
            setIsNewPostAnImage(true);
            modalRef?.current?.showModal();
          }}
        >
          <FontAwesomeIcon icon={faCamera} />
        </button>
      </div>
      <div id={styles.feed}></div>

      <Modal ref={modalRef}>
        <header className={styles["create-post-header"]}>
          <button className={styles["post-to-button"]}>
            <ProfilePicture userProfile={userProfile} />
            <h1>{userProfile?.username}</h1>
            <p>Post to followers</p>
            <FontAwesomeIcon
              className={styles["down-icon"]}
              icon={faAngleDown}
            />
          </button>
          <button
            className={styles["exit-modal-button"]}
            onClick={() => modalRef?.current?.close()}
          >
            <FontAwesomeIcon icon={faX} />
          </button>
        </header>
        <CreatePostForm image={isNewPostAnImage} />
      </Modal>
    </div>
  );
}
