import { createRouter, createWebHistory } from "vue-router";

const WordleContainer = () => import("./pages/WordlePage.vue");
const SuperSecret = () => import("./pages/SuperSecret.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: WordleContainer,
  },
  {
    path: "/supersecret",
    name: "secret",
    component: SuperSecret,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
