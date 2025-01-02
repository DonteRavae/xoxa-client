// REMIX
import { useMatches } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";
// EXTERNAL
import invariant from "tiny-invariant";
// INTERNAL
import { communityFetch } from "../../actions";
import { UserProfileSnapshot } from "../../../data/types";
import { GET_DISCUSSION_POST } from "../../actions/community/queries";
import ProfilePicture from "../../../components/ProfilePicture/ProfilePicture";
// STYLES
import styles from "../../styles/discussionPost.module.css";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  invariant(params.communityName, "Expected params.communityName");
  invariant(params.postId, "Expected params.postId");

  return await communityFetch(request, GET_DISCUSSION_POST, {
    request: params.postId,
  });
};

export default function DiscussionPostPage() {
  const matches = useMatches();
  const userProfile = matches[0].data as UserProfileSnapshot | null;

  return (
    <main className={styles.container}>
      <article>
        <header>
          <h1>{}</h1>
          <h2>{}</h2>
          <ul>{}</ul>
          <div></div>
          <div>
            <ProfilePicture userProfile={userProfile} />
          </div>
        </header>
        <section>{/* Discussion Post Content Will Go Here */}</section>
        <footer></footer>
      </article>
    </main>
  );
}
