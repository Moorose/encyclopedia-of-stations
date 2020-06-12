import { UserApi } from '@/modules/api';

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
      },
      (err) => {
        console.log(err.response.data.message);
      });
  },
  getUserById({ commit }, id) {
    return UserApi.getById(id)
      .then(({ data }) => data,
        (err) => {
          console.log(err.response.data.message);
        });
  },
  updateUser({ commit }, user) {
    return UserApi.update(user)
      .then(({ data }) => data,
        (err) => {
          console.log(err.response.data.message);
        });
  },
  createUser({ commit }, user) {
    return UserApi.create(user);
  },
  searchUsersByString({ commit }, str) {
    return UserApi.getByString(str)
      .then(({ data }) => data,
        (err) => {
          console.log(err.response.data.message);
        });
  },
};

export default actions;
