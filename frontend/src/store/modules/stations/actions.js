import { StationApi } from '@/modules/api';


const actions = {
  searchStationsByName({ commit }, name) {
    return StationApi.getByName(name)
      .then(({ data }) => {
        return data;
      }, () => {
      });
  },
  getStationsById({ commit }, id) {
    return StationApi.getById(id)
      .then(({ data }) => {
        return data;
      }, () => {
      });
  },
  getAllStations({ commit }) {
    return StationApi.getAll()
      .then(({ data }) => {
        return data;
      }, () => {
      });
  },
  updateStationData({ commit }, station) {
    return StationApi.update(station);
  },
};

export default actions;
