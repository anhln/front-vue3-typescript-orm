import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/store/user";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
      },
    ],
    meta: { requiresAuth: true },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/components/user/Profile.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/components/user/Login.vue"),
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
      console.log("login requires");
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
