import axios from "axios";

export const AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_CUSTOM_BASE_URL,
  }
);
