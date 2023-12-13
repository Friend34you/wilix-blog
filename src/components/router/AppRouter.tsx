import {createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/test",
    element: <div>Test</div>,
  },
]);
const AppRouter = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default AppRouter;