const actions = {
  loginAction({ commit }, { login, password }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        commit('setUser', { login, password, username: 'Eugene Vigonniy' });
        commit('setLoggedIn', true);
        resolve();
      }, 1000);
    });
  },
  logout({ commit }) {
    commit('removeUser');
    commit('setLoggedIn', false);
  },
  getUserInfo({ commit }) {
    // return axios.get('/api/me')
    //   .then((response) => {
    //     commit('setUser', response);
    //     commit('setLoggedIn', true);
    //
    //     return response;
    //   });
  },
};

export default actions;
