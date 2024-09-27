import axios from "axios";
import { refreshToken } from "./auth.api";
import { message } from "antd";

//cau hinh axios
export const instance = axios.create({
  baseURL: "http://localhost:8080/",
  timeout: 300000,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config: originalRequest, response } = error;
    const rid = window.localStorage.getItem('refreshToken');

    if (response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (!rid) {
        window.location.href = '/login';
        message.error('Please login again.');
        throw new Error('Refresh token expired.');
      }

      try {
        const { data } = await refreshToken({ refreshToken: rid });
        const { access_token, refresh_token } = data.data;

        window.localStorage.setItem("token", access_token);
        window.localStorage.setItem("refreshToken", refresh_token);

        instance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        originalRequest.headers['Authorization'] = `Bearer ${access_token}`;

        return instance(originalRequest);
      } catch (refreshError) {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        throw refreshError;
      }
    }

    return Promise.reject(error);
  }
);