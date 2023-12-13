// import {RoutesConsts} from "../../utils/routesConsts.ts";
import type {RouteObject} from "react-router-dom";

//TODO: пока так для построения структуры, потом откоменчу и добавлю компонентв путям
export const publicRoutes: RouteObject[] = [
    {
    path: "/public1",
    element: <div>public 111</div>
  },
  {
    path: "/public2",
    element: <div>public 222</div>
  },
//   {
//     path: RoutesConsts.ARTICLES_ROUTE,
//     Component: </>
//   },
//   {
//     path: RoutesConsts.ONE_ARTICLE_ROUTE,
//     Component: </>
//   },
//   {
//     path: RoutesConsts.PROFILE_ROUTE,
//     Component: </>
//   },
//   {
//     path: RoutesConsts.REGISTRATION_ROUTE,
//     Component: </>
//   },
//   {
//     path: RoutesConsts.AUTHORIZATION_ROUTE,
//     Component: </>
//   },
];

//TODO: тож самое что и выше
export const privateRoutes: RouteObject[] = [
  {
    path: "/private1",
    element: <div>private 111</div>
  },
  {
    path: "/private2",
    element: <div>private 222</div>
  },
  // {
  //   path: RoutesConsts.CREATE_ARTICLE_ROUTE,
  //   Component: </>
  // },
  // {
  //   path: RoutesConsts.FAVORITE_ARTICLES_ROUTE,
  //   Component: </>
  // },
];