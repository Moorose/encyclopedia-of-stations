import axios from 'axios';

const API = 'http://localhost:3000';

export const UserApi = {
  getMe() {
    return axios.get(`${API}/me`);
  },
  login(login, password) {
    return axios.post(`${API}/login`, { login, password });
  },
  logout() {
    return axios.post(`${API}/logout`);
  },
  getById(userId) {
    return axios.get(`${API}/user/${userId}`);
  },
  getSimilarUser(user) {
    return axios.get(`${API}/user`, user);
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
