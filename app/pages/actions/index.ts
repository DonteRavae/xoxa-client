import { data, redirect } from "@remix-run/node";
import {
  AccessType,
  CreateAccountRequest,
  LoginRequest,
} from "../../utils/types";

export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.API_URL
    : "http://127.0.0.1:8000";

export const getUserProfileSnapshot = async (request: Request) => {
  return fetch(`${BASE_URL}/xis/getAuthenticatedUserProfile`, {
    headers: request.headers,
    credentials: "include",
  }).then(async (response) => {
    const path = new URL(request.url).pathname;
    const headers = new Headers();
    headers.append("Set-Cookie", response.headers.getSetCookie()[0]);
    const userProfile = await response.json();

    // Redirect to user dashboard if user is logged in and there's an attempt to navigate to the index, login, or register routes.
    if (
      userProfile &&
      response.status === 200 &&
      (path === "/" || path === "/login" || path === "/register")
    )
      return redirect("/xc/feed");

    if (
      userProfile &&
      response.status === 201 &&
      (path === "/" || path === "/login" || path === "/register")
    ) {
      return redirect("/xc/feed", { headers });
    }

    if (userProfile && response.status === 201)
      return data(userProfile, { headers });

    return userProfile;
  });
};

export const requestAccess = async (
  request: CreateAccountRequest | LoginRequest,
  accessType: AccessType
) => {
  return await fetch(`${BASE_URL!}/auth/${accessType}`, {
    method: "POST",
    body: JSON.stringify(request),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const communityFetch = async (
  query: string,
  variables?: { request: string }
) => {
  try {
    const response = await fetch(`${BASE_URL}/xcs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      credentials: "include",
    });

    if (response.status === 200) return await response.json();
  } catch (error) {
    console.error(error);
  }
};
