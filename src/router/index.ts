import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/store/user";
import DefaultLayout from "@/layouts/default/Default.vue";
import LoginLayout from "@/layouts/default/LoginLayout.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
    meta: { requiresAuth: true, layout: DefaultLayout },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/components/user/Profile.vue"),
    meta: { requiresAuth: true, layout: DefaultLayout },
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/components/user/Login.vue"),
    meta: { layout: LoginLayout },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const currentUser = localStorage.getItem("user");

  if (currentUser && to.name === "Login") {
    next("/");
  }

  if (to.meta.requiresAuth) {
    if (!userStore.user && !localStorage.getItem("user")) {
      next("/login");
    } else {
      userStore.user = JSON.parse(localStorage.getItem("user"));
      next();
    }
  } else {
    next();
  }
});

export default router;
