import type {IProfile} from "./profileType.ts";

export interface IArticle {
  author: Omit<IProfile, "following">
  tagList : string[]
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  body?: string;
}