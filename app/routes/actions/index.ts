import {
  AccessType,
  CreateAccountRequest,
  LoginRequest,
} from "../../utils/types";

export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.API_URL
    : "http://127.0.0.1:8000";

export const getUserProfileSnapshot = async (headers: Headers) => {
  return fetch(`${BASE_URL}/xis/getAuthenticatedUserProfile`, {
    headers,
    credentials: "include",
  }).then((res) => res.json());
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
