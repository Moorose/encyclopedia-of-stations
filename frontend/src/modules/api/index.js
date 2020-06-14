import axios from 'axios';

const API = 'http://localhost:3000';

export const UserApi = {
  getMe() {
    return axios.get(`${API}/me`);
  },
  login(login, password) {
    return axios.post(`${API}/login`, {
      login,
      password,
    });
  },
  logout() {
    return axios.post(`${API}/logout`);
  },
  getById(userId) {
    return axios.get(`${API}/user/${userId}`);
  },
  getByString(str) {
    return axios.get(`${API}/user/string/${str}`);
  },
  getSimilarUser(param) {
    return axios.get(`${API}/user/query`, {
      params: { ...param },
    });
  },
  create(user) {
    return axios.post(`${API}/user`, user);
  },
  delete(userId) {
    return axios.delete(`${API}/user/${userId}`);
  },
  update(user) {
    return axios.put(`${API}/user`, user);
  },
};

export const StationApi = {
  getById(stationId) {
    return axios.get(`${API}/station/${stationId}`);
  },
  getByUNM(UNM) {
    return axios.get(`${API}/station/unm/${UNM}`);
  },
  getByName(name) {
    console.log(name);

    return axios.get(`${API}/station/name/${name}`);
  },
  getAll() {
    return axios.get(`${API}/station`);
  },
  create(station) {
    return axios.post(`${API}/station`, station);
  },
  delete(stationId) {
    return axios.delete(`${API}/station/${stationId}`);
  },
  update(station) {
    return axios.put(`${API}/station`, station);
  },
  setRelatedById(parentStationId, childStationId) {
    return axios.post(`${API}/station/${parentStationId}/to/${childStationId}`);
  },
  removeRelatedById(parentStationId, childStationId) {
    return axios.delete(`${API}/station/${parentStationId}/to/${childStationId}`);
  },
};
