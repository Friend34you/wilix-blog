import {Outlet, useNavigate} from "react-router-dom";
// import usersStore from "../../store/usersStore.ts";
// import {useEffect} from "react";
import usersStore from "../../store/usersStore.ts";
import {useEffect} from "react";

const isAuth = !!usersStore.user;

const ProvideAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/test");
    }
  }, [navigate]);

  //
  // useEffect(() => {
  //   usersStore
  //     .fetchUser()
  //     .finally(() => {
  //       if (!usersStore.user) {
  //         navigate("/test");
  //     }
  //   });
  // }, [navigate]);

  return (
    <>
      <p>Private</p>
      <Outlet />
    </>
  );
};

export default ProvideAuth;