<template>
  <app-bar />
  <side-bar />
  <v-main>
    <v-container fluid style="height: 100%">
      <slot />
    </v-container>
  </v-main>
</template>
<script lang="ts">
  import AppBar from "@/views/AppBar.vue";
  import SideBar from "@/views/SideBar.vue";
  export default {
    name: "LayoutDefault",
    components: {
      AppBar,
      SideBar,
    },
  };
</script>
