import { getRepository, Repository } from 'typeorm';
import { User } from '../entity/User';
import { IUser } from '../interface';
import { hashPassword } from '../helper'

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
  getById({ userId }): Promise<User> {
    const repository: Repository<User> = getRepository(User);

    return repository.findOne(userId);
  },
  getSimilarUser(user: IUser): Promise<User[]> {
    const repository: Repository<User> = getRepository(User);

    return repository.find({
      where:[
        {},
      ]
    });
  },
  async update(user: IUser): Promise<User> {
    const repository: Repository<User> = getRepository(User);
    const userToUpdate: User = await repository.findOne(user.id);

    userToUpdate.login = user.login;
    userToUpdate.firstName = user.firstName;
    userToUpdate.lastName = user.lastName;
    userToUpdate.patronymicName = user.patronymicName;
    userToUpdate.password = await hashPassword(user.password);
    userToUpdate.role = user.role;

    return repository.save(userToUpdate);
  },
  async delete({ userId }): Promise<void> {
    const repository: Repository<User> = getRepository(User);
    const userToRemove: User = await repository.findOne(userId);

    await repository.remove(userToRemove);
  },
};
