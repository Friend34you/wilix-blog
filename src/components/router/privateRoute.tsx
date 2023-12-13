import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";

const PrivateRoute = () => {
  //TODO: убрать проверку по ключу
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
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