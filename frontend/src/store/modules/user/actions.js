import { UserApi } from '@/api';

const actions = {
  loginAction({ commit }, { login, password }) {
    return UserApi.login(login, password)
      .then(({ data }) => {
        commit('setUser', data);
        commit('setLoggedIn', true);
      });
  },
  logout({ commit }) {
    return UserApi.logout()
      .then(() => {
        commit('removeUser');
        commit('setLoggedIn', false);
      });
  },
  getUserInfo({ commit }) {
    return UserApi.getMe()
      .then(({ data }) => {
        commit('setUser', data);
        commit('setLoggedIn', true);

        return data;
      }, () => {
      });
  },
  searchUsersByString({ commit }, str) {
    return UserApi.getSimilarUser(str)
      .then(({ data }) => data, () => {
      });
  },
};

export default actions;
