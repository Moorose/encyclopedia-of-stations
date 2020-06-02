import { User } from '../entity/User';
import { IUser } from '../interface';

export default {
  create(user: IUser): User {

  },
  getById({ userId: number }): User | null {
    return null;
  },
  getSimilarUser(user: User): User[] {
  },
  update(user: IUser): User {
    return null;
  },
  delete({ userId: number }): void {
  },
};
