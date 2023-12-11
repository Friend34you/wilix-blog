import axios from "axios";

export enum ApiMethods {
  POST = "post",
  GET = "get",
  PUT = "put",
  DELETE = "delete"
}

export const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_CUSTOM_BASE_URL,
});

const getAuthToken = () => {
  if (localStorage.getItem("token")) {
    return `Token ${localStorage.getItem("token")}`;
  }
  return null;
};

AxiosInstance.interceptors.request.use((config) => {
  config.headers["Authorization"] = getAuthToken();
  return config;
});