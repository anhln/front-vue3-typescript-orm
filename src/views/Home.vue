<template>
  <h1>
    Welcome <span class="username">{{ user?.username }}</span>
  </h1>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { useUserStore } from "@/store/user";

  export default defineComponent({
    name: "HOME",
    setup() {
      const userStore = useUserStore();
      const user = userStore.user;

      return {
        user,
      };
    },
  });
</script>
<style lang="scss" scoped>
  .username {
    color: aqua;
  }
</style>
