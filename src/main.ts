/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

// Manage statements
import { createPinia } from "pinia";

// Plugins
import { registerPlugins } from "@/plugins";

const app = createApp(App);

app.use(createPinia());

registerPlugins(app);

app.mount("#app");
