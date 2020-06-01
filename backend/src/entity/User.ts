import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IUser } from '../interface';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50
  })
  username: string;

  @Column({
    length: 30
  })
  firstName: string;

  @Column({
    length: 30
  })
  lastName: string;

  @Column({
    length: 10
  })
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


