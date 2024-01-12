import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import usersStore from "../../store/UsersStore.ts";
import {Routes} from "./routes.tsx";
import {useUnit} from "effector-react";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const isUserAuth = useUnit(usersStore.isUserAuth);

  useEffect(() => {
    if (!isUserAuth) {
      navigate(Routes.AUTHORIZATION);
    }
  }, [isUserAuth, navigate]);

  if (isUserAuth) {
    return <Outlet />;
  }
};

export default PrivateRoute;