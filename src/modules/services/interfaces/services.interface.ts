import { IUser } from 'modules/users/interfaces/users.interface';
import { IDefaultDocument } from 'shared/models/default-document.models';
import { LocationEnum, ServiceCategoryEnum } from './services.enums';

export interface IService extends IDefaultDocument {
  title: string;
  description?: string;
  photos?: string[];
  sourceUrl?: string;
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
    | 'photos'
    | 'sourceUrl'
    | 'price'
    | 'category'
    | 'duration'
    | 'region'
    | 'address'
  > {
  userId?: number;
}

export interface IUpdateService {
  id: number;
  title?: string;
  description?: string;
  photos?: string[];
  sourceUrl?: string;
  price?: number;
  category?: ServiceCategoryEnum;
  duration?: string;
  region?: LocationEnum;
  address?: string;
}

export interface IFindExisting extends Pick<IService, 'title' | 'category' | 'region'> {}
