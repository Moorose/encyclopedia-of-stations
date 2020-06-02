import { IStation } from '../interface/index';
import { Station } from '../entity/Station';

export default {
  getById({ stationId: number }): Station {
  },
  getAll(): Station[] {
  },
  create(station: IStation): Station {
  },
  deleteById({stationId: number}): void {
  },
  update(station: IStation): Station {
  },
  setRelatedById({parentStationId: number, childStationId: number}): Station {
  },
};
