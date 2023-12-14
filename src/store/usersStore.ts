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
      this.fetchUser();
    }
  }

  get user() {
    return this.userItem;
  }

  set user(userData) {
    this.userItem = userData;
  }

  private createUserSession = (responseData: UserResponseType) => {
    const {email, token, username} = responseData.user;
    this.user = {
      email,
      username
    };
    localStorage.setItem("token", token);
  };

  logoutUser = () => {
    localStorage.removeItem("token");
    this.user = null;
  };

  registerUser = async (userData: RegisterUserType) => {
    try {
      const response = await AxiosInstance.post<UserResponseType>("/users", {
        user: userData
      });
      this.createUserSession(response.data);
    } catch (error) {
      throw new Error("Error: Something went wrong :( " + error);
    }
  };

  loginUser = async (userData: LoginUserType) => {
    try {
      const response = await AxiosInstance.post<UserResponseType>("/users/login", {
        user: userData
      });
      this.createUserSession(response.data);
    } catch (error) {
      throw new Error("Error: Something went wrong :( " + error);
    }
  };

  fetchUser = async () => {
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
