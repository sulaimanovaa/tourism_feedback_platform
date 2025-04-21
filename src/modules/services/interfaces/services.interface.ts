import { IUser } from 'modules/users/interfaces/users.interface';
import { IDefaultDocument } from 'shared/interfaces/default-document.interface';
import { LocationEnum, ServiceCategoryEnum } from './services.enums';

export interface IService extends IDefaultDocument {
  title: string;
  description?: string;
  photos?: string[];
  contactInfo?: string;
  price?: number;
  category: ServiceCategoryEnum;
  duration?: string;
  region: LocationEnum;
  address?: string;
  user: IUser;
  averageRating: number;
}

export interface ICreateService
  extends Pick<
    IService,
    | 'title'
    | 'description'
    | 'contactInfo'
    | 'price'
    | 'category'
    | 'duration'
    | 'region'
    | 'address'
  > {
  userId?: number;
}

export interface IUpdateService {
  id: string;
  title?: string;
  description?: string;
  contactInfo?: string;
  price?: number;
  category?: ServiceCategoryEnum;
  duration?: string;
  region?: LocationEnum;
  address?: string;
}

export interface IFindExisting extends Pick<IService, 'title' | 'category' | 'region'> {}
