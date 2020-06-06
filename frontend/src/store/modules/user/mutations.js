const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },
  removeUser(state) {
    state.user = null;
  },
  setLoggedIn(state, value){
    state.loggedIn = value;
  },
};

export default mutations;
