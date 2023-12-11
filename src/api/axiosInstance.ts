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
