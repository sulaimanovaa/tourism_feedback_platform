import { InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewLikeEntity } from 'entities/review-like.entity';
import { Repository } from 'typeorm';
import { IReviewLike, IReviewLikeIds, IReviewLikesCount } from './interfaces/review-like.interface';

export class ReviewLikeRepository {
  private readonly logger: Logger;

  constructor(
    @InjectRepository(ReviewLikeEntity)
    private readonly likesRepository: Repository<IReviewLike>,
  ) {
    this.logger = new Logger(ReviewLikeEntity.name);
  }

  async findOneByIds(dto: IReviewLikeIds): Promise<IReviewLike | undefined> {
    try {
      const result = await this.likesRepository.findOne({
        where: {
          user: { id: dto.userId },
          review: { id: dto.reviewId },
        },
      });
      return result;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`${this.findOneByIds.name} - ${error.message}`);
      }
      throw new InternalServerErrorException();
    }
  }

  async save(props: IReviewLikeIds): Promise<IReviewLike | undefined> {
    try {
      const result = await this.likesRepository.create({
        user: { id: props.userId },
        review: { id: props.reviewId },
      });
      await this.likesRepository.save(result);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`${this.save.name} - ${error.message}`);
      }
      throw new InternalServerErrorException();
    }
  }

  async delete(props: IReviewLike): Promise<void> {
    try {
      await this.likesRepository.remove(props);
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`${this.delete.name} - ${error.message}`);
      }
      throw new InternalServerErrorException();
    }
  }

  async getLikesCount(reviewId: string): Promise<IReviewLikesCount> {
    try {
      const count = await this.likesRepository.count({
        where: { review: { id: reviewId } },
      });
      return { count };
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`${this.delete.name} - ${error.message}`);
      }
      throw new InternalServerErrorException();
    }
  }
}
