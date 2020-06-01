import { Entity, OneToMany, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IStation } from "../interface";
import { WorkingPlace } from './WorkingPlace'

@Entity()
export class Station {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  description: string;

  @Column({
    length: 10
  })
  UNM: string; //The unified network marking

  @OneToMany((type) => WorkingPlace, (workingPlace) => workingPlace.station)
  workingPlaces: WorkingPlace[];

  @Column()
  theNextStationId: number;

  @Column()
  thePreviousStationId: number;

  public constructor(data: IStation) {
    if (data) {
      this.description = data.description;
      this.UNM = data.UNM;
      this.workingPlaces = data.workingPlaces;
      this.theNextStationId = data.theNextStationId;
      this.thePreviousStationId = data.thePreviousStationId;
    }
  }
}


