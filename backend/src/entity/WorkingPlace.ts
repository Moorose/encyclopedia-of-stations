/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Entity, ManyToOne, PrimaryGeneratedColumn, Column,
} from 'typeorm';
import { IWorkingPlaces } from '../interface';
import { Station } from './Station';

@Entity()
export class WorkingPlace {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  telephone: string;

  @Column()
  IPAddress: string;

  @Column()
  password: string;

  @Column()
  position: string;

  @Column()
  description: string;

  @Column()
  AO: string;

  @ManyToOne((type) => Station,
    (station) => station.workingPlaces,
    { onDelete: 'CASCADE' })
  station: Station;

  public constructor(data: IWorkingPlaces) {
    if (data) {
      this.telephone = data.telephone;
      this.IPAddress = data.IPAddress;
      this.password = data.password;
      this.position = data.position;
      this.description = data.description;
      this.AO = data.AO;
      this.station = data.station;
    }
  }
}
