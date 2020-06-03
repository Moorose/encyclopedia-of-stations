import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
  },
  {
    path: '/map',
    name: 'Map',
    component: () => import('@/views/Map.vue'),
  },
  {
    path: '/search-station',
    name: 'SearchStation',
    component: () => import('@/views/SearchStation.vue'),
  },
  {
    path: '/add-station',
    name: 'AddStation',
    component: () => import('@/views/AddStation.vue'),
  },
  {
    path: '/station',
    name: 'Station',
    component: () => import('@/views/Station.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
