/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Entity, ManyToOne, PrimaryGeneratedColumn, Column,
} from 'typeorm';
import { IWorkPlace } from '../interface';
import { Station } from './Station';

@Entity()
export class WorkPlace {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

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
  ASOUPMessage: string;

  @Column()
  ATDForms: string;

  @Column()
  AO: string;

  @ManyToOne((type) => Station,
    (station) => station.workingPlaces,
    { onDelete: 'CASCADE' })
  station: Station;

  public constructor(data: IWorkPlace) {
    if (data) {
      this.name = data.name;
      this.telephone = data.telephone;
      this.IPAddress = data.IPAddress;
      this.password = data.password;
      this.position = data.position;
      this.description = data.description;
      this.ASOUPMessage = data.ASOUPMessage;
      this.ATDForms = data.ATDForms;
      this.AO = data.AO;
      this.station = data.station;
    }
  }
}
