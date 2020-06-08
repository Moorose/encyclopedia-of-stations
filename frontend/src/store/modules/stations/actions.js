import { StationApi } from '@/api';


const actions = {
  searchStationsByName({ commit }, name) {
    return StationApi.getStationByName(name)
      .then(({ data }) => {
        commit('setStations', data);

        return data;
      }, () => {
      });
  },
};

export default actions;
