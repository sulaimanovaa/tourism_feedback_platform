import { IService } from 'modules/services/interfaces/services.interface';
import { IUser } from 'modules/users/interfaces/users.interface';

export interface ISavedService {
  id: number;
  user: IUser;
  service: IService;
  createdAt: Date;
}

export interface ISaveServiceIds {
  userId: number;
  serviceId: number;
}

export interface ISavedServiceStatus {
  saved: boolean;
  message: string;
}
