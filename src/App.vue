<template>
  <v-app>
    <component :is="this.$route.meta.layout || 'div'">
      <RouterView></RouterView>
    </component>
  </v-app>
</template>

<script setup lang="ts"></script>
