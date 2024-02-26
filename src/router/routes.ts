import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    // THIS IS WHERE WE NEED A HOMEPAGE TO SHOW UP
    children: [{ path: '', component: () => import('pages/BuildInProgress.vue') }],
  },
  {
    path: '/calculators',
    component: () => import('layouts/CalculationsLayout.vue'),
  },
  {
    path: '/about',
    component: () => import('pages/AboutPage.vue'),
  }
  ,
  {
    path: '/blog/:post',
    name: 'blog',
    component: () => import('layouts/BlogLayout.vue'),
    props: true,
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  }
];

export default routes;
