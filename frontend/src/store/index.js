import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import stations from './modules/stations';
import workplaces from './modules/workplaces';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    stations,
    workplaces,
  },
  plugins: [],
});
