// REMIX
import { LoaderFunctionArgs } from "@remix-run/node";
// EXTERNAL
import invariant from "tiny-invariant";
// INTERNAL
import ProfilePicture from "../../../components/ProfilePicture/ProfilePicture";
// STYLES
import styles from "../../styles/discussionPost.module.css";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.communityName, "Expected params.communityName");

  return null;
};

export default function CommunityPage() {
  return (
    <main className={styles.container}>
      <article>
        <header>
          <h1>{}</h1>
          <h2>{}</h2>
          <ul>{}</ul>
          <div></div>
          <div>
            <ProfilePicture userProfile={null} />
          </div>
        </header>
        <section>{/* Discussion Post Content Will Go Here */}</section>
        <footer></footer>
      </article>
    </main>
  );
}
