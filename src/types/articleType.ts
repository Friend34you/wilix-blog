export interface IArticle {
  author: {
    bio: string | null;
    following: boolean;
    image: string;
    username: string;
  };
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