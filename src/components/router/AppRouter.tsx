import {RouterProvider, createBrowserRouter} from "react-router-dom";
import {privateRoutes, publicRoutes} from "./routes.tsx";
import PrivateRoute from "./PrivateRoute.tsx";
import AppWrapper from "../AppWrapper.tsx";

//TODO: добавить NotFound component
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppWrapper />
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