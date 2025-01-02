// REMIX
import { Link, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, redirect } from "@remix-run/node";
// EXTERNAL
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
// INTERNAL
import { DiscussionPost } from "../../../data/types";
import { communityFetch } from "../../../pages/actions";
import DashboardFeed from "../../../components/DashboardFeed/DashboardFeed";
import { GET_USER_DASHBOARD } from "../../../pages/actions/community/queries";
// STYLES
import styles from "../../styles/dashboard.module.css";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const cookie = request.headers.get("cookie");
    if (!cookie?.includes("xat=")) {
      return redirect("/");
    }

    return await communityFetch(request, GET_USER_DASHBOARD);
  } catch (error) {
    return null;
  }
};

export default function UserDashboardPage() {
  // Dashboard Data
  const {
    data: { getUserDashboard },
  } = useLoaderData<typeof loader>();
  const { recentDiscussions } = getUserDashboard;

  return (
    <div id={styles["dashboard-container"]}>
      <aside id={styles["recent-discussions"]}>
        <h1>Recent Discussions</h1>
        <ul>
          {recentDiscussions.map((item: DiscussionPost) => (
            <li className={styles["recent-discussion-item"]} key={item.title}>
              <div className={styles["community-info"]}>
                <img
                  // src={item.community.logoUrl}
                  src="https://api.multiavatar.com/$2a837199-b2bf-4d6d-8b25-c94f0b51fe16.svg"
                  // alt={`${item.community.name} Logo`}
                  alt=""
                />
                <Link to={`/xc/${item.community.name}`}>
                  {item.community.name}
                </Link>
              </div>
              <h4 className={styles["discussion-title"]}>{item.title}</h4>
              <div className={styles["discussion-metadata"]}>
                <p>{item.likes} likes</p>
                <p>24 likes</p>
                <div className={styles.divider} />
                <p>{item.comments.length} comments</p>
              </div>
            </li>
          ))}
        </ul>
      </aside>

      <DashboardFeed />

      <aside id={styles["community-news"]}>
        <h1>Community News</h1>
        <ul></ul>
      </aside>
    </div>
  );
}
