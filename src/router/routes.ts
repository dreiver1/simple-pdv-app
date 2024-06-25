import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'category', component: () => import('pages/categoryPage.vue') },
      { path: 'product', component: () => import('pages/ProductPage.vue') },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/PointOfSale.vue'),
    children: [
      { path: 'pdv', component: () => import('pages/pointOfSalePage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
