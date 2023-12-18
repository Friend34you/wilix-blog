import {Outlet, RouterProvider, createBrowserRouter} from "react-router-dom";
import {privateRoutes, publicRoutes} from "./routes.tsx";
import PrivateRoute from "./privateRoute.tsx";
import AppHeader from "../header/AppHeader.tsx";

//TODO: вместо рутовой заглушки добавить полноценный компонент
//TODO: добавить NotFound component
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <AppHeader />
        <div>Wrapper <Outlet /></div>
        <h1>Footer</h1>
      </>
    ),
    children: [
      {
        element: <PrivateRoute />,
        children: privateRoutes
      },
      ...publicRoutes
    ]
  },
]);

const AppRouter = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default AppRouter;