import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  { path: '/about', component: () => import('@/views/About.vue'), name: 'About' },
  { path: '/map', component: () => import('@/views/Map.vue'), name: 'Map' },
  { path: '/search', component: () => import('@/views/SearchStation.vue'), name: 'SearchStation' },
  { path: '/station/add', component: () => import('@/views/AddStation.vue'), name: 'AddStation' },
  { path: '/station/:id', component: () => import('@/views/Station.vue'), name: 'Station' },
  { path: '/profile', component: () => import('@/views/Profile.vue'), name: 'Profile' },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
