import type {RouteObject} from "react-router-dom";
import App from "../App.tsx";

export enum Routes {
  REGISTRATION = "/register",
  AUTHORIZATION = "/login",
  ARTICLE = "/articles/:articleSlug",
  ARTICLES = "/articles",
  CREATE_ARTICLE = "/new-article",
  PROFILE = "/profile/:profileName",
  FAVORITE_ARTICLES = "/articles/favorite",
}

//TODO: добавить компоненты вместо заглушек
export const publicRoutes: RouteObject[] = [
  {
    path: Routes.ARTICLES,
    element: <App />
  },
  {
    path: Routes.ARTICLE,
    element: <div>Конкретная Статья</div>
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