import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect:'/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: '/', 
        component: () => import('components/commonContent.vue'),
        children:[
          {
            path: '/home',
            component: () => import('pages/home/index.vue'),
          }
        ]
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
