// Utilities
import { defineStore } from "pinia";
import axios from "axios";

interface User {
  email: string;
  name: string;
}

interface UserState {
  loggedIn: boolean;
  email: string | null;
  name: string | null;
}

export const useAppStore = defineStore({
  id: "user",
  state: (): UserState => ({
    loggedIn: false,
    email: null,
    name: null,
  }),
  actions: {
    async login(email: string, password: string): Promise<void> {
      try {
        const response = await axios.post("/api/login", {
          email: email,
          password: password,
        });

        const userData = response.data;
        this.loggedIn = true;
        this.email = userData.email;
        this.name = userData.name;
      } catch (error: any) {
        console.log(error.message);
      }
    },
    
    logout(): void {
      this.loggedIn = false;
      this.email = null;
      this.name = null;
    },
  },
});
