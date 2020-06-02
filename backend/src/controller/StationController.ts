import StationService from '../service/StationService';

export default {
  async getById(request) {
    return StationService.getById(request.params);
  },
  async getAll() {
    return StationService.getAll();
  },
  async create(request) {
    return StationService.create(request.payload);
  },
  async delete(request) {
    return StationService.deleteById(request.params);
  },
  async update(request) {
    return StationService.update(request.payload);
  },
  async setRelatedById(request) {
    return StationService.setRelatedById(request.params);
  },
};
