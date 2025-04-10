import { IDefaultDocument } from "src/shared/models/default-document.models";

export interface IUser extends IDefaultDocument {
  email: string;
  password: string;
  name: string;
  bio?: string;
  type: UserTypes;
  avatarUrl?: string;
  address?: string;
  contact?: string;
  nickname?: string;
}

export enum UserTypes {
  BUSINESS = 'business',
  USER = 'user',
}

export interface ICreateUser extends Pick<IUser,
'email'
| 'password'
| 'name'
| 'type'
> {}

export interface IUpdateUser extends Pick<IUser,
'id'
| 'bio'
| 'avatarUrl'
| 'address'
| 'nickname'
| 'contact'
> {
  name?: string;
}

export enum UserSortFields {
  ID = 'id',
  NAME = 'name',
  ADDRESS = 'address',
  EMAIL = 'email',
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at',
}
