import { IStation } from '../interface';
import { StationClass } from '../enum/StationClass';
import { Coordinates } from '../entity/Coordinates';

export const stations: IStation[] = [{
  name: 'Omskaiy Station',
  UNM: 666666,
  description: 'Just station',
  stationClass: StationClass.PASSENGER_STATION,
  stations: [],
  workingPlaces: [],
  coordinates: new Coordinates({ lat: 54.939616, lng: 73.385906 }),
}, {
  name: 'Novosibirskaya Station',
  UNM: 777777,
  description: 'Just station',
  stationClass: StationClass.PASSENGER_STATION,
  stations: [],
  workingPlaces: [],
  coordinates: new Coordinates({ lat: 55.035588, lng: 82.895181 }),
}, {
  name: 'Tomskaiy Station',
  UNM: 555555,
  description: 'Just station',
  stationClass: StationClass.PASSENGER_STATION,
  stations: [],
  workingPlaces: [],
  coordinates: new Coordinates({ lat: 56.460470, lng: 84.991118 }),
}];
