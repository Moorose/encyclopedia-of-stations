import { UserApi } from '@/api';
// import UserApi from '../../../api';

const actions = {
  loginAction({ commit }, { login, password }) {
    return UserApi.login(login, password)
      .then(({ data }) => {
        console.log(data);
        commit('setUser', data);
        commit('setLoggedIn', true);
      });
  },
  logout({ commit }) {
    return UserApi.logout()
      .then((response) => {
        console.log(response);
        commit('removeUser');
        commit('setLoggedIn', false);
      });
  },
  getUserInfo({ commit }) {
    return UserApi.getMe()
      .then((response) => {
        console.log(response);
        commit('setUser', response);
        commit('setLoggedIn', true);

        return response;
      }, () => {
      });
  },
};

export default actions;
