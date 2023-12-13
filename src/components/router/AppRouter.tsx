import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
// import {BrowserRouter, createBrowserRouter, Navigate, Outlet, Route, RouterProvider, Routes} from "react-router-dom";
// import App from "../App.tsx";
import {privateRoutes, publicRoutes} from "./routes.tsx";
import ProvideAuth from "./provideAuth.tsx";
import App from "../App.tsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <div>
//         Hello world!
//         <Outlet />
//       </div>),
//     errorElement: <Navigate to="/" />,
//     children: [
//       {
//         path: "/test",
//         element: <App />,
//       },
//       {
//         element: <ProvideAuth />,
//         children: privateRoutes
//       },
//       ...publicRoutes
//     ]
//   },
// ]);
const AppRouter = () => {

  return (
    // <RouterProvider router={router} />
    <BrowserRouter>
      <Routes>
        <Route
          element={(
            <div>Hello world!
              <Outlet/>
            </div>
          )}
          path="/"
        >
          <Route element={<App />} path="/test" />
          {publicRoutes.map(route =>
            <Route element={route.element} key={route.path} path={route.path}/>
          )}

          <Route element={<ProvideAuth/>}>
            {privateRoutes.map(route =>
              <Route element={route.element} key={route.path} path={route.path}/>
            )}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;