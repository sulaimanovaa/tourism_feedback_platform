import { IReview } from 'modules/reviews/interfaces/reviews.interface';
import { IUser } from 'modules/users/interfaces/users.interface';

export interface IReviewLike {
  id: number;
  user: IUser;
  review: IReview;
  createdAt: Date;
}

export interface IReviewLikeIds {
  userId: number;
  reviewId: number;
}

export interface IDeleteReviewLike extends Pick<IReviewLike, 'id'> {}

export interface IReviewLikeStatus {
  liked: boolean;
  message: string;
}

export interface IReviewLikesCount {
  count: number;
}
