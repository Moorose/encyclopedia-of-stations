/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Entity, OneToMany, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany, JoinColumn, OneToOne,
} from 'typeorm';
import { IStation } from '../interface';
import { WorkingPlace } from './WorkingPlace';
import { StationClass } from '../enum/StationClass';
import { Coordinates } from './Coordinates';

@Entity()
export class Station {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column({ unique: true })
  UNM: number; // The unified network marking

  @Column()
  stationClass: StationClass;

  @OneToMany((type) => WorkingPlace, (workingPlace) => workingPlace.station, { cascade: true })
  workingPlaces: WorkingPlace[];

  @ManyToMany((type) => Station, (station) => station.stations)
  @JoinTable()
  stations: Station[];

  @OneToOne((type) => Coordinates, (coordinates) => coordinates.station, { cascade: true })
  @JoinColumn()
  coordinates: Coordinates;

  public constructor(data: IStation) {
    if (data) {
      this.name = data.name;
      this.description = data.description;
      this.UNM = data.UNM;
      this.stationClass = data.stationClass;
      this.workingPlaces = data.workingPlaces;
      this.stations = data.stations;
      this.coordinates = data.coordinates;
    }
  }
}
