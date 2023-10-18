import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/musicDog/home",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/musicDog",
        component: () => import("components/commonContent.vue"),
        children: [
          {
            name: "home",
            path: "/musicDog/home",
            component: () => import("pages/home/index.vue"),
          },
          {
            name: "contentList",
            path: "/musicDog/contentList/:id",
            component: () => import("pages/content-list/index.vue"),
          },
        ],
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
