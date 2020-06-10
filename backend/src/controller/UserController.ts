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
  async getByString(request) {
    return UserService.searchUser(request.params);
  },
  async getWithQuery(request) {
    return UserService.getSimilarUser(request.query);
  },
  async update(request) {
    return UserService.update(request.payload);
  },
  async delete(request) {
    return UserService.delete(request.params);
  },
};
