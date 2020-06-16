import { getRepository, Repository } from 'typeorm';
import * as Boom from '@hapi/boom';
import { IWorkPlace } from '../interface/index';
import { WorkPlace } from '../entity/WorkPlace';

export default {
  async getAll({ stationId }): Promise<WorkPlace[]> {
    const repository: Repository<WorkPlace> = getRepository(WorkPlace);
    const result = await repository.find({
      relations: ['station'],
      where: {
        station: stationId,
      },
    });

    if (!result) {
      throw Boom.badRequest();
    }

    return result;
  },
  create({ stationId }, workingPlace: IWorkPlace) {
  },
  delete({ workPlaceId }): void {
  },
  update({ workPlaceId }) {
  },
};
