import { IDefaultDocument } from 'shared/models/default-document.models';

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
  id?: number;
}

export enum UserSortFields {
  ID = 'id',
  NAME = 'name',
  ADDRESS = 'address',
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at',
}
