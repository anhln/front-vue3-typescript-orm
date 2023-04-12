<template>
  <h1>Welcome {{ user?.name }}</h1>
  <v-btn @click="handleLogout">Logout</v-btn>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { useUserStore } from "@/store/user";

  export default defineComponent({
    name: "HOME",
    setup() {
      const userStore = useUserStore();
      const user = userStore.user;

      const handleLogout = () => {
        userStore.logout();
      };

      return {
        user,
        handleLogout,
      };
    },
  });
</script>
