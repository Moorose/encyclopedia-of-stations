import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IUser } from '../interface';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  role: string;

  public constructor(data: IUser) {
    if (data) {
      this.username = data.username;
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.role = data.role;
    }
  }
}


