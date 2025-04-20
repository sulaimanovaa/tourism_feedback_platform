import { InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ICreateReview,
  IFindReviewByIds,
  IListResponseReviews,
  IReview,
  IReviewStats,
  IUpdateReview,
} from './interfaces/reviews.interface';
import { ReviewEntity } from 'entities/reviews.entity';
import { PageOptionsReviewDto } from './dto/page-options-service.dto';
import { ReviewFilterType } from './interfaces/reviews.enum';

export class ReviewRepository {
  private readonly logger: Logger;

  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<IReview>,
  ) {
    this.logger = new Logger(ReviewEntity.name);
  }

  async findById(id: string): Promise<IReview | undefined> {
    try {
      const user = await this.reviewRepository.findOne({
        where: {
          id: id,
          isDeleted: false,
        },
        relations: ['user'],
      });
      return user;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`${this.findById.name} - ${error.message}`);
      }
      throw new InternalServerErrorException();
    }
  }

  async findReviewByIds(props: IFindReviewByIds): Promise<IReview | undefined> {
    try {
      const review = await this.reviewRepository.findOne({
        where: {
          user: { id: props.userId },
          service: { id: props.serviceId },
        },
      });
      return review;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`${this.findReviewByIds.name} - ${error.message}`);
      }
      throw new InternalServerErrorException();
    }
  }

  async findDeletedById(id: string): Promise<IReview | undefined> {
    try {
      const user = await this.reviewRepository.findOne({
        where: {
          id: id,
          isDeleted: true,
        },
      });
      return user;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`${this.findDeletedById.name} - ${error.message}`);
      }
      throw new InternalServerErrorException();
    }
  }

  public async create(props: ICreateReview): Promise<IReview> {
    try {
      const instance = this.reviewRepository.create(props);
      const result = await this.reviewRepository.save(instance);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`${this.create.name} - ${error.message}`);
      }
      throw new InternalServerErrorException();
    }
  }

  public async update(props: IUpdateReview): Promise<void> {
    try {
      await this.reviewRepository.update(props.id, props);
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`${this.update.name} - ${error.message}`);
      }
      throw new InternalServerErrorException();
    }
  }

  async getReviews(serviceId: string, query: PageOptionsReviewDto): Promise<IListResponseReviews> {
    const queryBuilder = this.reviewRepository
      .createQueryBuilder('review')
      .where('review.service = :serviceId', { serviceId })
      .leftJoinAndSelect('review.user', 'user');

    if (query.filter === ReviewFilterType.POSITIVE) {
      queryBuilder.andWhere('review.rating >= :rating AND review.isRecommended = true', {
        rating: 3,
      });
    } else if (query.filter === ReviewFilterType.NEGATIVE) {
      queryBuilder.andWhere('review.rating <= :rating', { rating: 3 });
    } else if (query.filter === ReviewFilterType.WITH_PHOTOS) {
      queryBuilder.andWhere('review.photos IS NOT NULL');
    }

    if (query.sortOrder) {
      queryBuilder.orderBy(`review.createdAt`, query.sortOrder);
    }
    queryBuilder.take(query.limit).skip(query.skip);

    const total = await queryBuilder.getCount();
    const items = await queryBuilder.getMany();
    const stats = await this.getReviewStats(serviceId);
    const totalPages = Math.ceil(total / query.limit);

    return {
      total,
      items,
      stats,
      limit: query.limit,
      page: query.page,
      totalPages,
    };
  }

  async getReviewStats(serviceId: string): Promise<IReviewStats> {
    const qb = this.reviewRepository
      .createQueryBuilder('review')
      .where('review.service = :serviceId', { serviceId })
      .andWhere('review.isDeleted = false');

    const [all, withPhotos, positive, negative] = await Promise.all([
      qb.clone().getCount(),
      qb.clone().andWhere('review.photos IS NOT NULL').getCount(),
      qb
        .clone()
        .andWhere('review.rating >= :minRating', { minRating: 3 })
        .andWhere('review.isRecommended = true')
        .getCount(),
      qb.clone().andWhere('review.rating <= :maxRating', { maxRating: 3 }).getCount(),
    ]);

    return {
      all,
      withPhotos,
      positive,
      negative,
    };
  }
}
