import { Injectable } from '@nestjs/common';
import { ReviewLikeRepository } from './review-like.repository';
import {
  IReviewLikeIds,
  IReviewLikesCount,
  IReviewLikeStatus,
} from './interfaces/review-like.interface';
import { ReviewsService } from '../reviews/reviews.service';

@Injectable()
export class ReviewLikeService {
  constructor(
    private readonly likeRepository: ReviewLikeRepository,
    private readonly reviewService: ReviewsService,
  ) {}

  async toggleLike(dto: IReviewLikeIds): Promise<IReviewLikeStatus> {
    await this.reviewService.findById(dto.reviewId);

    const existing = await this.likeRepository.findOneByIds(dto);
    if (existing) {
      await this.likeRepository.delete(existing);
      return { liked: false, message: 'Лайк удалён' };
    }

    await this.likeRepository.save(dto);
    return { liked: true, message: 'Отзыв лайкнут' };
  }

  async getLikesCount(reviewId: number): Promise<IReviewLikesCount> {
    const count = await this.likeRepository.getLikesCount(reviewId);
    return count;
  }
}
