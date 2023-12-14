import type {RouteObject} from "react-router-dom";
import App from "../App.tsx";

export enum Routes {
  REGISTRATION_ROUTE = "/register",
  AUTHORIZATION_ROUTE = "/login",
  ONE_ARTICLE_ROUTE = "/articles/:articleSlug",
  ARTICLES_ROUTE = "/articles",
  CREATE_ARTICLE_ROUTE = "/new-article",
  PROFILE_ROUTE = "/profile/:profileName",
  FAVORITE_ARTICLES_ROUTE = "/articles/favorite",
}

//TODO: добавить компоненты вместо заглушек
export const publicRoutes: RouteObject[] = [
  {
    path: Routes.ARTICLES_ROUTE,
    element: <App />
  },
  {
    path: Routes.ONE_ARTICLE_ROUTE,
    element: <div>Конкретная Статья</div>
  },
  {
    path: Routes.PROFILE_ROUTE,
    element: <div>Профиль пользователя</div>
  },
  {
    path: Routes.REGISTRATION_ROUTE,
    element: <div>Регистрация</div>
  },
  {
    path: Routes.AUTHORIZATION_ROUTE,
    element: <div>Авторизация</div>
  },
];

//TODO: тож самое что и выше
export const privateRoutes: RouteObject[] = [
  {
    path: Routes.CREATE_ARTICLE_ROUTE,
    element: <div>Создать новую статью</div>
  },
  {
    path: Routes.FAVORITE_ARTICLES_ROUTE,
    element: <div>Лайкнутые статьи</div>
  },
];