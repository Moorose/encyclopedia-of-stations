import { getRepository, Repository, Like } from 'typeorm';
import * as Boom from '@hapi/boom';
import { User } from '../entity/User';
import { IUser } from '../interface';
import { hashPassword } from '../helper';

export default {
  async create(user: IUser): Promise<User> {
    user.password = await hashPassword(user.password);

    const userToSave: User = new User(user);
    const repository: Repository<User> = getRepository(User);

    try {
      const savedUser:User = await repository.save(userToSave);

      delete savedUser.password;

      return savedUser;
    } catch (err) {
      const { name, severity, code } = err;
      let { message } = err;

      if (code === '23505') {
        message = 'Такой login уже существует';
      }
      throw Boom.badData(message);
    }
  },
  getAll(): Promise<User[]> {
    const repository: Repository<User> = getRepository(User);

    return repository.find();
  },
  getMe(credentials: IUser): Promise<IUser> {
    const user: IUser = { ...credentials };

    delete user.password;

    return Promise.resolve(user);
  },
  getById({ userId }): Promise<User> {
    const repository: Repository<User> = getRepository(User);

    return repository.findOne(userId);
  },
  getByLogin(login): Promise<User> {
    return getRepository(User)
      .createQueryBuilder('user')
      .select('user.id')
      .addSelect('user.login')
      .addSelect('user.firstName')
      .addSelect('user.lastName')
      .addSelect('user.patronymicName')
      .addSelect('user.position')
      .addSelect('user.role')
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
