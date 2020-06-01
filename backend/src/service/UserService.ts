import { User } from '../entity/User';

export default {
  create(user: User): User {

  },
  getById(userId: number): User | null {
    return null;
  },
  getSimilarUser(user: User): User[] {
  },
  update(user: User): User {
    return null;
  },
  delete(id: number): void {
  },
};
