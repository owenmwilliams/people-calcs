import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    // THIS IS WHERE WE NEED A HOMEPAGE TO SHOW UP
    // children: [{ path: '', component: () => import('pages/AboutPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
  {
    path: '/calculators',
    component: () => import('layouts/CalculationsLayout.vue'),
  },
  {
    path: '/about',
    component: () => import('pages/AboutPage.vue'),
  }
];

export default routes;
