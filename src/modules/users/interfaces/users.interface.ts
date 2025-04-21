import { IDefaultDocument } from 'shared/interfaces/default-document.interface';

export interface IUser extends IDefaultDocument {
  email: string;
  password: string;
  isVerified?: boolean;
  name?: string;
  bio?: string;
  avatarUrl?: string;
  username?: string;
}

export interface ICreateUser extends Pick<IUser, 'name'> {}

export interface IUpdateUser extends Pick<IUser, 'bio' | 'username'> {
  name?: string;
  id?: string;
}

export enum UserSortFields {
  ID = 'id',
  NAME = 'name',
  ADDRESS = 'address',
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at',
}
