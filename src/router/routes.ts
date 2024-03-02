import BuildInProgressVue from 'pages/BuildInProgress.vue';
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    // THIS IS WHERE WE NEED A HOMEPAGE TO SHOW UP
    children: [{ path: '', component: () => import('pages/BuildInProgress.vue') }],
  },
  {
    path: '/calculators/:calculator?',
    children: [
      {
        path: '',
        name: 'calculators-grid',
        component: () => import('pages/CalculatorsGrid.vue'),
      },
      {
        path: ':calculator',
        name: 'calculators',
        component: () => import('layouts/CalculationsLayout.vue'),
        props: true,
      },
    ],
  },

  // {
  //   path: '/calculators/:calculator',
  //   name: 'calculators',
  //   component: () => import('layouts/CalculationsLayout.vue'),
  //   props: true,
  // },
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
