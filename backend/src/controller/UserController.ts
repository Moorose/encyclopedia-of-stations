import UserService from '../service/UserService';

export default {
  async create(request) {
    return UserService.create(request.payload);
  },
  async getMe(request) {
    return UserService.getMe(request.auth.credentials);
  },
  async getById(request) {
    return UserService.getById(request.params);
  },
  async get(request) {
    return UserService.getSimilarUser(request.payload);
  },
  async update(request) {
    return UserService.update(request.payload);
  },
  async delete(request) {
    return UserService.delete(request.params);
  },
};
