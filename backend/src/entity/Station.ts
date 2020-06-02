/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Entity, OneToMany, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany,
} from 'typeorm';
import { IStation } from '../interface';
import { WorkingPlace } from './WorkingPlace';

@Entity()
export class Station {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  description: string;

  @Column({
    length: 10,
  })
  UNM: string; // The unified network marking

  @OneToMany((type) => WorkingPlace, (workingPlace) => workingPlace.station)
  workingPlaces: WorkingPlace[];

  @Column()
  theNextStationId: number;

  @ManyToMany((type) => Station, (station) => station.stations)
  @JoinTable()
  stations: Station[];

  public constructor(data: IStation) {
    if (data) {
      this.description = data.description;
      this.UNM = data.UNM;
      this.workingPlaces = data.workingPlaces;
      this.stations = data.stations;
    }
  }
}
