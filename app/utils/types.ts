export enum AccessType {
  Register = "create",
  Login = "login",
}

export type UserProfileSnapshot = {
  id: string;
  username: string;
  img_url: string;
};

/// REQUEST AND RESPONSES

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
  headers?: Headers;
  payload?: UserProfileSnapshot;
  error?: string;
};
