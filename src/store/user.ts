// Utilities
import { defineStore } from "pinia";
// import axios, { AxiosError } from "axios";
import axiosInstance from "@/api/index";

interface User {
  email: string;
  name: string;
}

interface UserState {
  user: User | null;
  error: string | null;
}

export const useUserStore = defineStore({
  id: "user",
  state: (): UserState => ({
    user: null,
    error: null,
  }),
  actions: {
    async login(email: string, password: string): Promise<void> {
      try {
        const response = await axiosInstance.post<{ user: User }>("/login/", {
          username: email.value,
          password: password.value,
        });

        const userData = response.data;
        this.user = userData.user;
        localStorage.setItem("user", JSON.stringify(this.user));
        this.error = null;
      } catch (error: unknown) {
        this.user = null;
      }
    },

    logout(): void {
      this.user = null;
      this.error = null;
      localStorage.removeItem("user");
    },
    setUser(user: any) {
      this.user = user;

      // if (user) {
      //   axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
      // } else {
      //   delete axios.defaults.headers.common["Authorization"];
      // }
    },
    checkUser() {
      const user = localStorage.getItem("user");

      if (user) {
        this.setUser(JSON.parse(user));
      }
    },
  },
});
