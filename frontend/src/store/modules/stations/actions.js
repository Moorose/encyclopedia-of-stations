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
  getStationsByUNM({ commit }, UNM) {
    return StationApi.getByUNM(UNM)
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
  saveStationData({ commit }, station) {
    return StationApi.create(station);
  },
  updateStationData({ commit }, station) {
    return StationApi.update(station);
  },
  bindStationById({ commit }, { parentStationId, childStationId }) {
    return StationApi.setRelatedById(parentStationId, childStationId);
  },
  unbindStationById({ commit }, { parentStationId, childStationId }) {
    return StationApi.removeRelatedById(parentStationId, childStationId);
  },
};

export default actions;
