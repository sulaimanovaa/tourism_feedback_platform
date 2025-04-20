import { IService } from 'modules/services/interfaces/services.interface';
import { IUser } from 'modules/users/interfaces/users.interface';

export interface ISavedService {
  id: string;
  user: IUser;
  service: IService;
  createdAt: Date;
}

export interface ISaveserviceIds {
  userId: string;
  serviceId: string;
}

export interface ISavedServiceStatus {
  saved: boolean;
  message: string;
}
