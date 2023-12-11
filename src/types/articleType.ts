import type {IProfile} from "./profileType.ts";

export interface IArticle {
  author: IProfile
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