// Utilities
import { defineStore } from "pinia";
import { AxiosError } from "axios";
import axiosInstance from "@/api/index";

interface User {
  email: string;
  name: string;
}

interface UserState {
  user: User | null;
}

export const useUserStore = defineStore({
  id: "user",
  state: (): UserState => ({
    user: null,
  }),
  actions: {
    async login(email: string, password: string) {
      try {
        const response = await axiosInstance.post<{ user: User }>("/login/", {
          username: email.value,
          password: password.value,
        });

        const userData = response.data;
        this.user = userData.user;
        localStorage.setItem("user", JSON.stringify(this.user));
        localStorage.setItem("access_token", userData.access_token);
        localStorage.setItem("refresh_token", userData.refresh_token);
      } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response?.status === 401) {
          throw new Error("Invalid email or password");
        }
        if (axiosError.response?.status === 400) {
          throw new Error("Invalid email or password");
        }

        throw new Error("Unable to login");
      }
    },

    logout(): void {
      this.user = null;
      localStorage.removeItem("user");
    },
    setUser(user: any) {
      this.user = user;
    },
    checkUser() {
      const user = localStorage.getItem("user");

      if (user) {
        this.setUser(JSON.parse(user));
      }
    },
    async getUser() {
      try {
        const response = await axiosInstance.get<{ user: User }>("/user", {});
      } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response?.status === 401) {
          throw new Error("Invalid email or password");
        }
        if (axiosError.response?.status === 400) {
          throw new Error("Invalid email or password");
        }

        throw new Error("Unable to login");
      }
    },
  },
});
