import bcrypt from 'bcryptjs';
import * as Boom from '@hapi/boom';
import { UserRole } from '../enum/UserRole';
import { User } from '../entity/User';
import UserService from '../service/UserService';
import StationService from '../service/StationService';
import { getTestUsers } from '../testData/Users';
import { stations } from '../testData/Stations';
import { IUser } from '../interface';

export async function hashPassword(password): Promise<string> {
  // return bcrypt.hash(password, 10);
  return password;
}

export async function comparePassword(newPassword: string, oldPassword: string): Promise<boolean> {
  return newPassword === oldPassword;
  // return bcrypt.compare(newPassword, oldPassword);
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

  return user;
}

export async function setAdmin(): Promise<User> {
  const admin: IUser = {
    login: 'Admin',
    firstName: process.env.ADMIN_FIRST,
    lastName: process.env.ADMIN_LAST,
    patronymicName: process.env.ADMIN_PATRONYMIC,
    position: 'Технолог',
    password: process.env.ADMIN_PASSWORD,
    role: UserRole.Admin,
  };

  const [isAdminExists] = await UserService.getSimilarUser(admin);

  if (isAdminExists) {
    return Promise.resolve(isAdminExists);
  }
  admin.password = await this.hashPassword(admin.password);

  return UserService.create(admin);
}

export async function setTestUsers(): Promise<User[]> {
  const users: IUser[] = getTestUsers();
  const password = await this.hashPassword('test');

  users.forEach((user) => {
    user.password = password;
  });

  return Promise.all(
    users.map((user) => UserService.create(user)),
  );
}

export async function setStations(): Promise<void> {
  const isStationsExist = await StationService.getAll();

  if (isStationsExist.length) {
    return Promise.resolve();
  }

  const savedStations = await Promise.all(
    stations.map((station) => StationService.create(station)),
  );

  const [s1, s2, s3, s4] = savedStations;

  await StationService.setRelatedById({ parentStationId: s1.id, childStationId: s2.id });
  await StationService.setRelatedById({ parentStationId: s1.id, childStationId: s3.id });
  await StationService.setRelatedById({ parentStationId: s2.id, childStationId: s3.id });
  await StationService.setRelatedById({ parentStationId: s2.id, childStationId: s4.id });

  return Promise.resolve();
}
