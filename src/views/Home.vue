<template>
  <h1>
    Welcome <span class="username">{{ user?.username }}</span>
  </h1>
  <v-btn @click="handleLogout">Logout</v-btn>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { useUserStore } from "@/store/user";
  import router from "@/router";

  export default defineComponent({
    name: "HOME",
    setup() {
      const userStore = useUserStore();
      const user = userStore.user;
      console.log(user);

      const handleLogout = () => {
        userStore.logout();
        router.push("/login");
      };

      return {
        user,
        handleLogout,
      };
    },
  });
</script>
<style lang="scss" scoped>
  .username {
    color: aqua;
  }
</style>
