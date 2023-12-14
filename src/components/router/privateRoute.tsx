import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import usersStore from "../../store/usersStore.ts";

const PrivateRoute = () => {
  //TODO: убрать проверку по ключу и поменять на страницу логина путь
  const navigate = useNavigate();
  useEffect(() => {
    if (!usersStore.user) {
      navigate("/test");
    }
  }, [navigate]);

  //TODO: переделать вывод дочерних компонентов
  return (
    <>
      <p>Private</p>
      <Outlet />
    </>
  );
};

export default PrivateRoute;