import bcrypt from 'bcryptjs';
import * as Boom from '@hapi/boom';
import { UserRole } from '../enum/UserRole';
import { User } from '../entity/User';
import UserService from '../service/UserService';
import StationService from '../service/StationService';
import { Station } from '../entity/Station';
import { getTestUsers } from '../testData/Users';
import { stations } from '../testData/Stations';
import { IUser } from '../interface';

export async function hashPassword(password): Promise<string> {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      !err || reject(err);
      bcrypt.hash(password, salt, (err, hash) => {
        err ? reject(err) : resolve(hash);
      });
    });
  });
}

export async function comparePassword(newPassword: string, oldPassword: string): Promise<boolean> {
  return bcrypt.compare(newPassword, oldPassword);
}

export async function logout(request): Promise<any> {
  request.cookieAuth.clear();

  return Promise.resolve({ message: 'Logout succeed' });
}

export async function authUser(request): Promise<User> {
  const { login, password } = request.payload;
  const account = await UserService.getByLogin(login);

  if (!account || !(await comparePassword(password, account.password))) {
    throw Boom.unauthorized(`Authentication failed: ${request.auth.error.message}`);
  }
  request.cookieAuth.set({ id: account.id });

  const user: User = { ...account };

  delete user.password;

  return Promise.resolve(user);
}

export async function setAdmin(): Promise<User> {
  const admin: IUser = {
    login: 'Admin',
    firstName: process.env.ADMIN_FIRST,
    lastName: process.env.ADMIN_LAST,
    patronymicName: process.env.ADMIN_PATRONYMIC,
    position: 'Технолог',
    role: UserRole.Admin,
  };

  const [isAdminExists] = await UserService.getSimilarUser(admin);

  if (isAdminExists) {
    return Promise.resolve(isAdminExists);
  }
  admin.password = await this.hashPassword(process.env.ADMIN_PASSWORD);

  return UserService.create(admin);
}

export async function setTestUsers(): Promise<User[]> {
  const users: IUser[] = getTestUsers();
  const password = await this.hashPassword('test');

  users.forEach((user) => { user.password = password; });

  return Promise.all(
    users.map((user) => UserService.create(user)),
  );
}

export async function setStations(): Promise<Station[]> {
  const isStationsExist = await StationService.getAll();

  if (isStationsExist.length) {
    return Promise.resolve([]);
  }

  return Promise.all(
    stations.map((station) => StationService.create(station)),
  );
}
