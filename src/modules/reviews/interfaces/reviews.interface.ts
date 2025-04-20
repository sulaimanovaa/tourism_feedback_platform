import { IService } from 'modules/services/interfaces/services.interface';
import { IUser } from 'modules/users/interfaces/users.interface';
import { IDefaultDocument } from 'shared/models/default-document.models';
import { LikedAspectEnum, UsageType } from './reviews.enum';

export interface IReview extends IDefaultDocument {
  user: IUser;
  service: IService;
  content: string;
  rating: number;
  suggestion?: string;
  usageType: UsageType;
  experienceDate?: Date;
  isRecommended: boolean;
  likedAspects?: LikedAspectEnum[];
  customLikedAspect?: string;
  photos?: string[];
}

export interface ICreateReview
  extends Pick<
    IReview,
    | 'content'
    | 'rating'
    | 'suggestion'
    | 'experienceDate'
    | 'photos'
    | 'isRecommended'
    | 'likedAspects'
    | 'customLikedAspect'
    | 'usageType'
  > {
  serviceId: string;
}

export interface IUpdateReview
  extends Pick<
    IReview,
    'suggestion' | 'experienceDate' | 'photos' | 'id' | 'likedAspects' | 'customLikedAspect'
  > {
  content?: string;
  rating?: number;
  isRecommended?: boolean;
  usageType?: UsageType;
}

export interface IFindReviewByIds {
  userId: string;
  serviceId: string;
}

export interface IReviewStats {
  all: number;
  withPhotos: number;
  negative: number;
  positive: number;
}

export interface IListResponseReviews {
  items: IReview[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  stats: IReviewStats;
}
