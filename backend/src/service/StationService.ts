import { getManager, getRepository, Repository } from 'typeorm';
import * as Boom from '@hapi/boom';
import { Station } from '../entity/Station';
import { IStation } from '../interface';


export default {
  async getById({ stationId }): Promise<Station> {
    const repository: Repository<Station> = getRepository(Station);
    const result = await repository.findOne(stationId, { relations: ['stations', 'coordinates'] });

    if (!result) {
      throw Boom.badRequest();
    }

    return result;
  },
  async getByUNM({ UNM }): Promise<Station> {
    const repository: Repository<Station> = getRepository(Station);
    const result = await repository.findOne({ where: { UNM } });

    if (!result) {
      throw Boom.badRequest();
    }

    return result;
  },
  getByName({ name }): Promise<Station[]> {
    const repository: Repository<Station> = getRepository(Station);

    return repository.createQueryBuilder('station')
      .where('name ILIKE :name', { name: `%${name}%` })
      .getMany();
  },
  getAll(): Promise<Station[]> {
    const repository: Repository<Station> = getRepository(Station);

    return repository.find({ relations: ['stations', 'coordinates'] });
  },
  create(station: IStation): Promise<Station> {
    const repository: Repository<Station> = getRepository(Station);
    const stationToSave: Station = new Station(station);

    return repository.save(stationToSave);
  },
  async deleteById({ stationId }): Promise<void> {
    const repository: Repository<Station> = getRepository(Station);
    const stationToRemove: Station = await repository.findOne(stationId);

    await repository.remove(stationToRemove);
  },
  async update(station: IStation): Promise<Station> {
    const repository: Repository<Station> = getRepository(Station);
    const stationToUpdate: Station = await repository.findOne(station.id);

    stationToUpdate.name = station.name;
    stationToUpdate.UNM = station.UNM;
    stationToUpdate.stationClass = station.stationClass;
    stationToUpdate.description = station.description;

    return repository.save(stationToUpdate);
  },
  async setRelatedById({ parentStationId, childStationId }): Promise<Station> {
    return getManager().transaction(async (em) => {
      if (parentStationId === childStationId) {
        throw Boom.badRequest();
      }

      const repository: Repository<Station> = em.getRepository(Station);
      const parentStation: Station = await repository.findOne(parentStationId, { relations: ['stations'] });
      const childStation: Station = await repository.findOne(childStationId, { relations: ['stations'] });

      parentStation.stations.push(childStation);
      childStation.stations.push(parentStation);

      await repository.save(childStation);
      await repository.save(parentStation);

      return this.getById({ stationId: parentStationId });
    });
  },
  async removeRelatedById({ parentStationId, childStationId }): Promise<Station> {
    return getManager().transaction(async (em) => {
      if (parentStationId === childStationId) {
        throw Boom.badRequest();
      }

      const repository: Repository<Station> = em.getRepository(Station);
      const parentStation: Station = await repository.findOne(parentStationId, { relations: ['stations'] });
      const childStation: Station = await repository.findOne(childStationId, { relations: ['stations'] });

      parentStation.stations = parentStation.stations.filter((station) => station.id !== childStation.id);
      childStation.stations = childStation.stations.filter((station) => station.id !== parentStation.id);

      await repository.save(childStation);
      await repository.save(parentStation);

      return this.getById({ stationId: parentStationId });
    });
  },
};
