import WorkingPlaceService from '../service/WorkPlaceService';


export default {
  async getAll(request) {
    return WorkingPlaceService.getAll(request.params);
  },
  async create(request) {
    return WorkingPlaceService.create(request.params, request.payload);
  },
  async delete(request) {
    return WorkingPlaceService.delete(request.params);
  },
  async update(request) {
    return WorkingPlaceService.update(request.params);
  },
};
