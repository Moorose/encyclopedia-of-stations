import { User } from '../entity/User';
import { IUser } from '../interface';
import UserService from '../service/UserService';
import { UserRole } from '../enum/UserRole';
import bcrypt from 'bcryptjs';
import * as Boom from "@hapi/boom";

export async function hashPassword(password): Promise<string> {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function (err, salt) {
      !err || reject(err);
      bcrypt.hash(password, salt, function (err, hash) {
        err ? reject(err) : resolve(hash);
      });
    });
  });
}

export async function comparePassword(newPassword: string, oldPassword: string): Promise<boolean> {
  return bcrypt.compare(newPassword, oldPassword)
}

export async function logout(request): Promise<any> {
  request.cookieAuth.clear();
  return Promise.resolve({ message: 'Logout succeed' });
}

export async function authUser(request): Promise<any> {
  const { username, password } = request.payload;
  const account = await UserService.getByLogin(username);

  if (!account || !(await comparePassword(password, account.password))) {
    throw Boom.unauthorized(`Authentication failed: ${ request.auth.error.message }`);
  }
  request.cookieAuth.set({ id: account.id });

  return Promise.resolve({ message: 'Authentication succeed' });
}

export async function setAdmin(): Promise<User> {
  const admin: IUser = {
    login: 'Admin',
    firstName: process.env.ADMIN_FIRST,
    lastName: process.env.ADMIN_LAST,
    patronymicName: process.env.ADMIN_PATRONYMIC,
    role: UserRole.Admin,
  };
  const [isAdminExists] = await UserService.getSimilarUser(admin)

  if (isAdminExists) {
    return Promise.resolve(isAdminExists);
  }
  admin.password = await this.hashPassword(process.env.ADMIN_PASSWORD)

  return UserService.create(admin);
};

