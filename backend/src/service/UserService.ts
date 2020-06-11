import { getRepository, Repository, Like } from 'typeorm';
import { User } from '../entity/User';
import { IUser } from '../interface';
import { hashPassword } from '../helper';

export default {
  async create(user: IUser): Promise<User> {
    const repository: Repository<User> = getRepository(User);
    const userToSave: User = new User(user);

    return repository.save(userToSave);
  },
  getAll(): Promise<User[]> {
    const repository: Repository<User> = getRepository(User);

    return repository.find();
  },
  getMe(credentials: IUser): Promise<IUser> {
    const user: IUser = { ...credentials };

    console.log('getMe');
    console.log(user);

    delete user.password;

    return Promise.resolve(user);
  },
  getById({ userId }): Promise<User> {
    const repository: Repository<User> = getRepository(User);

    return repository.findOne(userId);
  },
  getByLogin(login): Promise<User> {
    return getRepository(User)
      .createQueryBuilder()
      .addSelect('user.password')
      .where('user.login = :login', { login })
      .getOne();
  },
  async searchUser({ str }) {
    const repository: Repository<User> = getRepository(User);

    return repository.createQueryBuilder('user')
      .where('user.login ILIKE :login', { login: `%${str}%` })
      .orWhere('user.firstName ILIKE :firstName', { firstName: `%${str}%` })
      .orWhere('user.lastName ILIKE :lastName', { lastName: `%${str}%` })
      .orWhere('user.patronymicName ILIKE :patronymicName', { patronymicName: `%${str}%` })
      .getMany();
  },
  getSimilarUser(user: IUser): Promise<User[]> {
    const repository: Repository<User> = getRepository(User);

    const conditions = Object.entries(user).map(([key, value]) => {
      if (typeof value === 'number') {
        return { [key]: value };
      }

      return { [key]: Like(`%${value}%`) };
    });

    return repository.find({ where: conditions });
  },
  async update(user: IUser): Promise<User> {
    const repository: Repository<User> = getRepository(User);
    const userToUpdate: User = await repository.findOne(user.id);

    userToUpdate.firstName = user.firstName;
    userToUpdate.lastName = user.lastName;
    userToUpdate.patronymicName = user.patronymicName;

    if (user.password) {
      userToUpdate.password = await hashPassword(user.password);
    }
    if (user.position) {
      userToUpdate.position = user.position;
    }
    if (user.role) {
      userToUpdate.role = user.role;
    }

    const updatedUser: User = await repository.save(userToUpdate);

    delete updatedUser.password;

    return updatedUser;
  },
  async delete({ userId }): Promise<void> {
    const repository: Repository<User> = getRepository(User);
    const userToRemove: User = await repository.findOne(userId);

    await repository.remove(userToRemove);
  },
};
