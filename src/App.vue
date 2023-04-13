<template>
  <v-app>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script lang="ts">
  import { useUserStore } from "./store/user";
  import { defineComponent, onMounted } from "vue";

  export default defineComponent({
    setup() {
      const authStore = useUserStore();
      onMounted(() => {
        authStore.checkUser();
      });

      return {};
    },
  });
</script>
<style>
  .v-main {
    padding: 0px;
  }
</style>
