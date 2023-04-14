import axios from "axios";
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();

const csrfToken = cookies.get("csrftoken") || "";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  withCredentials: true,
});

axiosInstance.defaults.headers.common["X-CSRFToken"] = csrfToken;

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    const newCsrfToken = response.headers["x-csrftoken"];
    if (newCsrfToken) {
      axios.defaults.headers.common["X-CSRFToken"] = newCsrfToken;
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.config.__isRetryRequest) {
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      error.response.data.message === "Access token expired"
    ) {
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        try {
          const response = await axios.post("/token/refresh", {
            refresh: refreshToken,
          });

          const { access_token } = response.data;

          localStorage.setItem("access_token", access_token);

          // Retry the original request with the new access token
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          originalRequest.__isRetryRequest = true;

          return axiosInstance(originalRequest);
        } catch (error) {
          // If the refresh token has also expired, log the user out
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          // Redirect the user to the login page or show an error message
        }
      }
    }
  }
);

export default axiosInstance;
