import {makeAutoObservable} from "mobx";
import {AxiosInstance} from "../api/axiosInstance.ts";

type UserType = {
  username: string,
  email: string
}

type UserResponseType = {
  user: {
    username: string,
    email: string,
    token: string
  }
}

type RegisterUserType = {
  username: string,
  email: string,
  password: string
}

type LoginUserType = {
  email: string,
  password: string
}

class UserStore {

  private userItem: UserType | null = null;

  constructor() {
    makeAutoObservable(this);
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

}

export default new UserStore();
