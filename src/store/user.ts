// Utilities
import { defineStore } from "pinia";
// import axios, { AxiosError } from "axios";
import axiosInstance from  "@/api/index";

interface User {
  email: string;
  name: string;
}

interface UserState {
  user: User | null,
  error: string | null;
}

export const useUserStore = defineStore({
  id: "user",
  state: (): UserState => ({
    user: null,
    error: null
  }),
  actions: {
    async login(email: string, password: string): Promise<void> {
      console.log(email.value, password.value);
      try {
        const response = await axiosInstance.post<{user: User}>("/login/", {
          username: email.value,
          password: password.value,
        });

        const userData = response.data;
        this.user = userData.user;
        this.error = null;
      } catch (error: unknown) {
       
        console.log(error.message)
        this.user = null
      }
    },
    
    logout(): void {
      this.user = null
      this.error = null
    },
  },
});
