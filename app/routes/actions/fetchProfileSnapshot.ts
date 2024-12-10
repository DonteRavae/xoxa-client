// INTERNAL
import refreshAuth from "./refreshAuth";
import { UserProfileSnapshot } from "../../utils/types";

const fetchSnapshot = async (headers: Headers) => {
  return await fetch("http://localhost:8000/xis/fetchUserProfileSnapshot", {
    headers,
    credentials: "include",
  });
};

export default async function fetchUserProfileSnapshot(request: Request) {
  const response = await fetchSnapshot(request.headers);

  // If access token is expired or invalid, attempt to refresh
  if (response.status === 401) {
    await refreshAuth(request).then(async (response) => {
      return response.ok
        ? await fetchSnapshot(response.headers).then(
            async (res) => (await res.json()) as UserProfileSnapshot
          )
        : null;
    });
  }

  return response.ok ? ((await response.json()) as UserProfileSnapshot) : null;
}
