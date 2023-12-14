import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import usersStore from "../../store/usersStore.ts";
import {Routes} from "./routes.tsx";

const PrivateRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!usersStore.isUserAuth) {
      navigate(Routes.AUTHORIZATION);
    }
  }, [navigate]);

  return <Outlet />;
};

export default PrivateRoute;