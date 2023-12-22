import type {RouteObject} from "react-router-dom";
import Article from "../article/Article.tsx";
import Profile from "../profile/Profile.tsx";
import Registration from "../authorization/Registration.tsx";
import Authorization from "../authorization/Authorization.tsx";
import NewArticle from "../NewArticle.tsx";
import Articles from "../articlesFeed/Articles.tsx";
import Feed from "../articlesFeed/Feed.tsx";
import PrivateRoute from "./PrivateRoute.tsx";
import UserFeed from "../articlesFeed/UserFeed.tsx";

export enum Routes {
  REGISTRATION = "/register",
  AUTHORIZATION = "/login",
  ARTICLE = "/articles/:articleSlug",
  ARTICLES = "/articles/",
  CREATE_ARTICLE = "/new-article",
  PROFILE = "/profiles/:profileName",
  CURRENT_PROFILE = "/profiles/",
  FAVORITE_ARTICLES = "/articles/favorite",
}

//здесь отдельные независимые приватные роуты, остальные находятся в publicRoutes в обёртке PrivateRoute
export const privateRoutes: RouteObject[] = [
  {
    path: Routes.CREATE_ARTICLE,
    element: <NewArticle />
  }
];

export const publicRoutes: RouteObject[] = [
  {
    element: <Articles />,
    index: true
  },
  {
    element: <Articles />,
    children: [
      {
        path: Routes.ARTICLES,
        element: <Feed />,
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: Routes.FAVORITE_ARTICLES,
            element: <UserFeed />
          },
        ]
      }
    ]
  },
  {
    path: Routes.ARTICLE,
    element: <Article />
  },
  {
    path: Routes.PROFILE,
    element: <Profile />
  },
  {
    path: Routes.REGISTRATION,
    element: <Registration />
  },
  {
    path: Routes.AUTHORIZATION,
    element: <Authorization />
  },
];

