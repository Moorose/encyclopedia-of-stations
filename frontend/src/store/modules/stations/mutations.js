const mutations = {
  setCashedStations(state, payload) {
    const { cashedStations } = state;
    const filteredStations = cashedStations.filter((cashedStation) => {
      return !payload.every((newStation) => cashedStation.id === newStation.id);
    });

    state.cashedStations = [...filteredStations, ...payload];
  },
};

export default mutations;
