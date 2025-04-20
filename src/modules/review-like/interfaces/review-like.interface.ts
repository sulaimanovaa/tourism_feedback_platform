import { IReview } from 'modules/reviews/interfaces/reviews.interface';
import { IUser } from 'modules/users/interfaces/users.interface';

export interface IReviewLike {
  id: string;
  user: IUser;
  review: IReview;
  createdAt: Date;
}

export interface IReviewLikeIds {
  userId: string;
  reviewId: string;
}

export interface IDeleteReviewLike extends Pick<IReviewLike, 'id'> {}

export interface IReviewLikeStatus {
  liked: boolean;
  message: string;
}

export interface IReviewLikesCount {
  count: number;
}
