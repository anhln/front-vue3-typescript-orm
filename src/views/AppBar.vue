<template>
  <v-app-bar
    color="teal-darken-4"
    image="https://picsum.photos/1920/1080?random"
  >
    <template v-slot:image>
      <v-img
        gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
      ></v-img>
    </template>

    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>LOGIN-VUE3-VUETIFY3-TEMPLATE</v-app-bar-title>

    <v-spacer></v-spacer>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props">
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-list dense>
          <v-list-item>
            <v-list-item-avatar>
              <v-avatar>
                <v-img src="https://picsum.photos/id/237/200/200"></v-img>
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="subtitle-1">John Doe</v-list-item-title>
              <v-list-item-subtitle class="caption"
                >johndoe@example.com</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item link @click="handleProfile">
            <v-list-item-icon>
              <v-icon>mdi-account-circle-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="subtitle-2">Profile</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-settings-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="subtitle-2">Settings</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link @click="handleLogout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="subtitle-2">Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>
<script lang="ts">
  import { defineComponent, ref } from "vue";
  import { useUserStore } from "@/store/user";
  import router from "@/router";

  export default defineComponent({
    setup() {
      const userStore = useUserStore();

      const handleLogout = () => {
        userStore.logout();
        router.push("/login");
      };

      const handleProfile = () => {
        router.push("/profile");
      };

      return {
        handleLogout,
        handleProfile,
      };
    },
  });
</script>
<style scoped>
  v-menu__content {
    max-width: 300px;
  }

  .v-card {
    border-radius: 8px;
  }

  .v-list-item-avatar {
    margin-right: 16px;
  }

  .v-list-item-content {
    display: flex;
    align-items: center;
  }

  .v-list-item-icon {
    min-width: 48px;
    display: flex;
    align-items: center;
  }

  .v-list-item-title {
    font-weight: bold;
  }

  .v-list-item-subtitle {
    color: #888;
  }
</style>
