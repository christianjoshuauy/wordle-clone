import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "./stores/user";

const WordleContainer = () => import("./pages/WordlePage.vue");
const SuperSecret = () => import("./pages/SuperSecret.vue");
const SignUp = () => import("./pages/SignUp.vue");
const SignIn = () => import("./pages/SignIn.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: WordleContainer,
    meta: { auth: true },
  },
  {
    path: "/supersecret",
    name: "secret",
    component: SuperSecret,
    meta: { auth: true },
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
    meta: { auth: false },
  },
  {
    path: "/login",
    name: "login",
    component: SignIn,
    meta: { auth: false },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  await userStore.refreshUser();

  if (!userStore.isAuth && to.meta.auth) {
    next({ name: "login" });
  } else if (userStore.isAuth && !to.meta.auth) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
