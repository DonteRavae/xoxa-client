export enum AccessType {
  Register = "create",
  Login = "login",
}

export type UserProfileSnapshot = {
  username: string;
  img_url: string;
};

export interface DiscussionPost {
  id: string;
  title: string;
  author: UserProfileSnapshot;
  likes: number;
  comments: Comment[];
  slug: string;
  community: Community;
}

export interface Comment {}

export interface Community {
  id: string;
  name: string;
  logoUrl: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  author: UserProfileSnapshot;
  likes: number;
  comments: Comment[];
  slug: string;
  community: Community;
}

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
