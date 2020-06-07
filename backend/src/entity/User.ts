import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IUser } from '../interface';
import { UserRole } from '../enum/UserRole';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  login: string;

  @Column({ length: 50 })
  firstName: string;

  @Column({ length: 50 })
  lastName: string;

  @Column({ length: 50 })
  patronymicName: string;

  @Column()
  password: string;

  @Column()
  role: UserRole;

  public constructor(data: IUser) {
    if (data) {
      this.login = data.login;
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.patronymicName = data.patronymicName;
      this.password = data.password;
      this.role = data.role;
    }
  }
}
