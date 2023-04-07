<template>
  <v-app>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
  import Login from "@/components/user/Login.vue";
</script>
<style>
  .v-main {
    padding: 0px;
  }
</style>
