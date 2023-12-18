import type {RouteObject} from "react-router-dom";
import App from "../App.tsx";
import Article from "../article/Article.tsx";

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

//TODO: добавить компоненты вместо заглушек
export const publicRoutes: RouteObject[] = [
  {
    element: <App />,
    index: true
  },
  {
    path: Routes.ARTICLES,
    element: <App />,
    index: true
  },
  {
    path: Routes.ARTICLE,
    element: <Article />
  },
  {
    path: Routes.PROFILE,
    element: <div>Профиль пользователя</div>
  },
  {
    path: Routes.REGISTRATION,
    element: <div>Регистрация</div>
  },
  {
    path: Routes.AUTHORIZATION,
    element: <div>Авторизация</div>
  },
];

//TODO: тож самое что и выше
export const privateRoutes: RouteObject[] = [
  {
    path: Routes.CREATE_ARTICLE,
    element: <div>Создать новую статью</div>
  },
  {
    path: Routes.FAVORITE_ARTICLES,
    element: <div>Лайкнутые статьи</div>
  },
];