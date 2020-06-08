import { getRepository, Like, Repository } from 'typeorm';
import { Station } from '../entity/Station';
import { IStation } from '../interface/index';


export default {
  getById({ stationId }): Promise<Station> {
    const repository: Repository<Station> = getRepository(Station);

    return repository.findOne(stationId, { relations: ['stations'] });
  },
  getByUNM({ UNM }): Promise<Station> {
    const repository: Repository<Station> = getRepository(Station);

    return repository.findOne({ where: { UNM: UNM } },);
  },
  getByName({ name }): Promise<Station[]> {
    const repository: Repository<Station> = getRepository(Station);

    return repository.createQueryBuilder("station")
      .where('name ILIKE :name', { name: `%${ name }%` })
      .getMany();
  },
  getAll(): Promise<Station[]> {
    const repository: Repository<Station> = getRepository(Station);

    return repository.find();
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

    stationToUpdate.description = station.description;
    stationToUpdate.UNM = station.UNM;

    return repository.save(stationToUpdate);
  },
  async setRelatedById({ parentStationId, childStationId }): Promise<Station> {
    const repository: Repository<Station> = getRepository(Station);
    const parentStation: Station = await repository.findOne(parentStationId, { relations: ['stations'] });
    const childStation: Station = await repository.findOne(childStationId, { relations: ['stations'] });

    parentStation.stations.push(childStation);
    childStation.stations.push(parentStation);

    return repository.save(parentStation);
  },
};
