import {makeAutoObservable} from "mobx";
import {AxiosInstance} from "../api/axiosInstance.ts";

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

class UsersStore {
  private userItem: UserType | null = null;

  constructor() {
    makeAutoObservable(this);

    if (localStorage.getItem("token") && !this.userItem) {
      this.getUser();
    }
  }

  get user() {
    return this.userItem;
  }

  set user(userData) {
    this.userItem = userData;
  }

  registerUser = async (userData: RegisterUserType) => {
    try {
      const response = await AxiosInstance.post<UserResponseType>("/users", {
        user: userData
      });
      const userResponseData = response.data.user;
      this.user = {
        email: userResponseData.email,
        username: userResponseData.username
      };

      localStorage.setItem("token", userResponseData.token);
    } catch (error) {
      throw new Error("Error: Something went wrong :( " + error);
    }
  };

  //по сути полностью идентичен предыдущему (за исключением url и параметоров),имеет ли смысл их объединять в один?
  loginUser = async (userData: LoginUserType) => {
    try {
      const response = await AxiosInstance.post<UserResponseType>("/users/login", {
        user: userData
      });
      const userResponseData = response.data.user;
      this.user = {
        email: userResponseData.email,
        username: userResponseData.username
      };

      localStorage.setItem("token", userResponseData.token);
    } catch (error) {
      throw new Error("Error: Something went wrong :( " + error);
    }
  };

  getUser = async () => {
    try {
      const response = await AxiosInstance.get<UserResponseType>("/user");
      const userResponseData = response.data.user;
      this.user = {
        email: userResponseData.email,
        username: userResponseData.username
      };
    } catch (error) {
      throw new Error("Error: Something went wrong :( " + error);
    }
  };
}

export default new UsersStore();
