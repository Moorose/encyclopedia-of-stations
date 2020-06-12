const getters = {
  isAllowed: (state) => ({ properRole }) => {
    return typeof properRole === 'undefined' || state.user.role <= properRole;
  },
};

export default getters;
