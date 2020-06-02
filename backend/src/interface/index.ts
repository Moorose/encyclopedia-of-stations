import { WorkingPlace } from "../entity/WorkingPlace";
import { Station } from "../entity/Station";

export interface IUser {
  id?: string;
  username: string;
  firstName: string;
  lastName: string;
  role?: string;
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
  description: string;
  UNM: string;
  workingPlaces: WorkingPlace[];
  stations: Station[];
}
