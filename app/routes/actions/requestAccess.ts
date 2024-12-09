import { UserProfileSnapshot } from "../../utils/types";

export type CreateAccountRequest = {
  email: string;
  username: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type AccessRequestResponse = {
  ok: boolean;
  headers: Headers;
  payload?: UserProfileSnapshot;
  error?: string;
};

export enum AccessType {
  Register = "create",
  Login = "login",
}

export default async function requestAccess(
  type: AccessType,
  request: CreateAccountRequest | LoginRequest
) {
  const response = await fetch(`http://localhost:8000/auth/${type}`, {
    method: "POST",
    body: JSON.stringify(request),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return {
    ok: response.ok,
    headers: response.headers,
    payload: response.ok && (await response.json()),
    error: !response.ok && (await response.text()),
  };
}
