import { WorkingPlace } from '../entity/WorkingPlace';
import { Station } from '../entity/Station';
import { UserRole } from '../enum/UserRole';
import { StationClass } from '../enum/StationClass';
import { Coordinates } from '../entity/Coordinates';

export interface IUser {
  id?: number;
  login: string;
  firstName: string;
  lastName: string;
  patronymicName: string;
  password?: string;
  position: string;
  role: UserRole;
}

export interface IWorkingPlace {
  id?: number;
  name: string;
  telephone: string;
  IPAddress: string;
  password: string;
  position: string;
  description: string;
  ASOUPMessage: string;
  ATDForms: string;
  AO: string;
  station: Station;
}

export interface IStation {
  id?: number;
  name: string;
  description: string;
  UNM: number;
  stationClass: StationClass;
  workingPlaces: WorkingPlace[];
  stations: Station[];
  coordinates?: Coordinates;
}

export interface ICoordinates {
  id?: number;
  lat: number;
  lng: number;
  station?: Station;
}
