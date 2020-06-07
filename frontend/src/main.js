import Vue from 'vue';
import axios from 'axios';
import App from './App';
import router from './router';
import store from './store';
import i18n from './locales';

axios.defaults.withCredentials = true;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
