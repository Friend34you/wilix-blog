import {makeAutoObservable} from "mobx";
import {AxiosInstance} from "../api/axiosInstance.ts";

type userResponseType = {
  user: {
    username: string,
    email: string,
    token: string,
  }
}

class UserStore {

  constructor() {
    makeAutoObservable(this);
  }

  registerUser = () => {
    try {
      const response = AxiosInstance.post<userResponseType>("/users");
    }
    catch (error) {
      throw new Error("Error: Something went wrong :( " + error);
    }
  };

  loginUser = () => {
    try {
      const response = AxiosInstance.post<userResponseType>("/users/login");
    }
    catch (error) {
      throw new Error("Error: Something went wrong :( " + error);
    }
  };

}

export default new UserStore();
