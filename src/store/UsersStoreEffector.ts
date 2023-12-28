import {createEffect, createEvent, createStore} from "effector";
import {AxiosInstance} from "../api/axiosInstance";

type UserType = {
  username: string,
  email: string
}

type UserResponseType = {
  user: UserType & {
    token: string
  }
}

type RegisterUserType = UserType & {
  password: string
}

type LoginUserType = Pick<UserType, "email"> & {
  password: string
}

const $user = createStore<UserType | null>(null);
const $isUserAuth = createStore(false);

const createUserSession = (responseData: UserResponseType) => {
  const {email, token, username} = responseData.user;
  localStorage.setItem("token", token);
  return {
    isAuth: true,
    user: {
      email,
      username,
    }
  };
};

const logoutUser = createEvent();
const userAlreadyAuthed = createEvent();

const registerUserFx = createEffect(async (userData: RegisterUserType) => {
  try {
    const response = await AxiosInstance.post<UserResponseType>("/users", {
      user: userData
    });
    return createUserSession(response.data);
  } catch (error) {
    throw new Error("Error: Something went wrong :( " + error);
  }
});

const loginUserFx = createEffect(async (userData: LoginUserType) => {
  try {
    const response = await AxiosInstance.post<UserResponseType>("/users/login", {
      user: userData
    });
    return createUserSession(response.data);
  } catch (error) {
    throw new Error("Error: Something went wrong :( " + error);
  }
});

const fetchUserFx = createEffect(async () => {
  try {
    const response = await AxiosInstance.get<UserResponseType>("/user");
    const userResponseData = response.data.user;
    return {
      email: userResponseData.email,
      username: userResponseData.username
    };
  } catch (error) {
    logoutUser();
    throw new Error("Error: Something went wrong :( " + error);
  }
});

if (localStorage.getItem("token")) {
  userAlreadyAuthed();
  fetchUserFx();
}

$user.on(loginUserFx.doneData, (_, userData) => userData.user);
$user.on(registerUserFx.doneData, (_, userData) => userData.user);
$user.on(fetchUserFx.doneData, (_, userData) => userData);
$user.on(logoutUser, () => {
  localStorage.removeItem("token");
  return null;
});

$isUserAuth.on(loginUserFx.doneData, (_, userData) => userData.isAuth);
$isUserAuth.on(registerUserFx.doneData, (_, userData) => userData.isAuth);
$isUserAuth.on(logoutUser, () => false);
$isUserAuth.on(userAlreadyAuthed, () => true);

const usersStore = {
  user: $user,
  isUserAuth: $isUserAuth,
  registerUser: registerUserFx,
  fetchUser: fetchUserFx,
  loginUser: loginUserFx,
  logoutUser,
};

export default usersStore;