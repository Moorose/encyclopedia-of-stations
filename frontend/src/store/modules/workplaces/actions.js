import { WorkPlaceApi } from '@/modules/api';

const actions = {
  getWorkPlacesByStationId({ commit }, stationId) {
    return WorkPlaceApi.getAll(stationId)
      .then(({ data }) => {
        return data;
      }, () => {
      });
  },
  createWorkPlace({ commit }, { workPlaceId, workPlace }) {
    return WorkPlaceApi.create(workPlaceId, workPlace)
      .then(({ data }) => {
        return data;
      }, () => {
      });
  },
  deleteWorkPlace({ commit }, workPlaceId) {
    return WorkPlaceApi.delete(workPlaceId)
      .then(({ data }) => {
        return data;
      }, () => {
      });
  },
  updateWorkPlace({ commit }, { workPlaceId, workPlace }) {
    return WorkPlaceApi.update(workPlaceId, workPlace)
      .then(({ data }) => {
        return data;
      }, () => {
      });
  },
};

export default actions;
