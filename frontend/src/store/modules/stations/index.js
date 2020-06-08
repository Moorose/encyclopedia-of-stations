import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const state = {
  cashedStations: [],
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
