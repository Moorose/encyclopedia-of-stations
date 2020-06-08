import { WorkingPlace } from "../entity/WorkingPlace";
import { Station } from "../entity/Station";
import { UserRole } from '../enum/UserRole';
import { StationClass } from "../enum/StationClass";

export interface IUser {
  id?: string;
  login: string;
  firstName: string;
  lastName: string;
  patronymicName: string;
  password?: string;
  role: UserRole;
}

export interface IWorkingPlace {
  id?: string;
  position?: string;
  description?: string;
  telephone?: string;
  AO?: string;
  IPAddress?: string;
  password?: string;
  station: Station;
}

export interface IStation {
  id?: string;
  name: string;
  description: string;
  UNM: number;
  stationClass: StationClass;
  workingPlaces: WorkingPlace[];
  stations: Station[];
}
