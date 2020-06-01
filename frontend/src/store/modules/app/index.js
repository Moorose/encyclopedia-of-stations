import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const state = {
  languages: [
    'en',
    'ru',
  ],
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
