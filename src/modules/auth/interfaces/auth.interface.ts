import { IUser } from 'modules/users/interfaces/users.interface';

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}

export interface IVerifyEmail {
  token: string;
}

export interface IPasswordTokenReset {
  id: string;
  token: string;
  user: IUser;
  expirationDate: Date;
  createdAt: Date;
}

export interface ICreatePasswordReset
  extends Pick<IPasswordTokenReset, 'token' | 'user' | 'expirationDate'> {}

export interface IReset {
  newPassword: string;
  confirmPassword: string;
}

export interface IRegistUser
  extends Pick<IUser, 'email' | 'password' | 'username' | 'isVerified'> {}

export interface ILogin extends Pick<IUser, 'email' | 'password'> {}

export interface IOutputMessage {
  message: string;
}
