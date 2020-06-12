import { IStation } from '../interface';
import { StationClass } from '../enum/StationClass';

export const stations: IStation[] = [{
  name: 'Omskaiy Station',
  UNM: 666666,
  description: 'Just station',
  stationClass: StationClass.PASSENGER_STATION,
  stations: [],
  workingPlaces: [],
}, {
  name: 'Novosibirskaya Station',
  UNM: 777777,
  description: 'Just station',
  stationClass: StationClass.PASSENGER_STATION,
  stations: [],
  workingPlaces: [],
}, {
  name: 'Tomskaiy Station',
  UNM: 555555,
  description: 'Just station',
  stationClass: StationClass.PASSENGER_STATION,
  stations: [],
  workingPlaces: [],
}];
