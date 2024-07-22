import { createRouter, createWebHistory, useRoute } from "vue-router";
import * as VueRouter from "vue-router";

export function setupRouter() {
  const routes: VueRouter.RouteRecordRaw[] = [
    {
      path: "/",
      name: "ContactList",
      component: () => import("@/pages/ContactList.vue"),
    },
    {
      path: "/create",
      name: "ContactFormCreate",
      component: () => import("@/pages/ContactForm.vue"),
    },
    {
      path: "/edit/:id",
      name: "ContactFormEdit",
      component: () => import("@/pages/ContactForm.vue"),
    },
    {
      path: "/contact/:id",
      name: "ContactItem",
      component: () => import("@/pages/ContactItem.vue"),
    },
  ];

  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  return router;
}
