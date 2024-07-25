import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/PointOfSale.vue'),
    beforeEnter: async (to, from, next) => {
      const token = await window.localStorage.getItem('accessToken');
      if (token) {
        next('/main');
      } else {
        next();
      }
    },
    children: [
      { path: '', component: () => import('pages/loginPage.vue') },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: async (to, from, next) => {
      const token = await window.localStorage.getItem('accessToken');
      if (!token) {
        next('/');
      } else {
        next();
      }
    },
    children: [
      { path: 'main', component: () => import('pages/IndexPage.vue') },
      { path: 'category', component: () => import('pages/categoryPage.vue') },
      { path: 'product', component: () => import('pages/ProductPage.vue') },
      { path: 'user', component: () => import('src/pages/UserPage.vue') }
    ],
  },
  {
    path: '/pdv',
    component: () => import('layouts/PointOfSale.vue'),
    beforeEnter: async (to, from, next) => {
      const token = await window.localStorage.getItem('accessToken');
      if (!token) {
        next('/');
      } else {
        next();
      }
    },
    children: [
      { path: '', component: () => import('pages/pointOfSalePage.vue') },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
