import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const state = {
  loggedIn: false,
  user: null,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
