import {Outlet, RouterProvider, createBrowserRouter, Navigate} from "react-router-dom";
import {privateRoutes, publicRoutes} from "./routes.tsx";
import PrivateRoute from "./privateRoute.tsx";
import App from "../App.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        Hello world!
        <Outlet />
      </div>),
    errorElement: <Navigate to="/" />,
    children: [
      {
        path: "/test",
        element: <App />,
      },
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