import { StationApi } from '@/api';


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
};

export default actions;
