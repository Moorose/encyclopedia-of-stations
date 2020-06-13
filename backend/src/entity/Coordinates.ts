/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Entity, OneToMany, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany, OneToOne, JoinColumn,
} from 'typeorm';
import { ICoordinates, IStation } from '../interface';
import { WorkingPlace } from './WorkingPlace';
import { StationClass } from '../enum/StationClass';
import { Station } from './Station';

@Entity()
export class Coordinates {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('double precision')
  lat: number;

  @Column('double precision')
  lng: number;

  @OneToOne((type) => Station, (station) => station.coordinates)
  station: Station;

  public constructor(data: ICoordinates) {
    if (data) {
      this.lat = data.lat;
      this.lng = data.lng;
      this.station = data.station;
    }
  }
}
