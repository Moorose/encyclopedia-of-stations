import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: () => import('@/views/SearchStation.vue'), name: 'SearchStation' },
  { path: '/about', component: () => import('@/views/About.vue'), name: 'About' },
  {
    path: '/map', component: () => import('@/views/Map.vue'), name: 'Map', props: (route) => ({ center: route.query }),
  },
  { path: '/station/add', component: () => import('@/views/AddStation.vue'), name: 'AddStation' },
  { path: '/station/:id', component: () => import('@/views/Station.vue'), name: 'Station' },
  { path: '/user', component: () => import('@/views/SearchUser.vue'), name: 'SearchUser' },
  { path: '/user/create', component: () => import('@/views/AddUser.vue'), name: 'AddUser' },
  { path: '/user/:id', component: () => import('@/views/Profile.vue'), name: 'Profile' },
  { path: '/profile', component: () => import('@/views/Profile.vue'), name: 'MyProfile' },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
