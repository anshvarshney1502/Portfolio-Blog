export interface Article {
  id: string;
  title: string;
  description: string;
  cover_image: string;
  url: string;
  page_views_count: number;
  public_reactions_count: number;
  comments_count: number;
  published_at?: string;
  reading_time_minutes?: number;
  tag_list?: string[];
}

export interface Project {
  title: string;
  description: string;
  logo: string;
  link: string;
  slug: string;
  tech?: string[];
  featured?: boolean;
}

export interface Repo {
  id: number;
  name: string;
  description: string;
  language: string;
  watchers: number;
  forks: number;
  stargazers_count: number;
  html_url: string;
  homepage: string;
  updated_at?: string;
  topics?: string[];
}

export interface User {
  login: string;
  name?: string;
  avatar_url: string;
  bio?: string;
  location?: string;
  public_repos: number;
  followers: number;
  following?: number;
}
