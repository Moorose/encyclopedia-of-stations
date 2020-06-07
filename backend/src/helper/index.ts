import { User } from '../entity/User';
import { IUser } from '../interface';
import UserService from '../service/UserService';
import { UserRole } from '../enum/UserRole';
import bcrypt from 'bcryptjs';

export async function hashPassword(password): Promise<string> {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function (err, salt) {
      !err || reject(err);
      bcrypt.hash(password, salt, function (err, hash) {
        console.log(hash);
        err ? reject(err) : resolve(hash);
      });
    });
  });
}

export async function comparePassword(oldPassword: string, newPassword: string): Promise<boolean> {
  return bcrypt.compare(newPassword, oldPassword)
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

