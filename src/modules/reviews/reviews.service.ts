import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewRepository } from './reviews.repository';
import { IListResponseReviews, IReview, IUpdateReview } from './interfaces/reviews.interface';
import { UsersService } from '../users/users.service';
import { ServicesService } from '../services/services.service';
import { PageOptionsReviewDto } from './dto/page-options-service.dto';
import { UploadService } from 'modules/upload/upload.service';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly userService: UsersService,
    private readonly serviceService: ServicesService,
    private readonly uploadService: UploadService,
  ) {}

  async create(userId: string, dto: CreateReviewDto): Promise<IReview> {
    const [user, service] = await Promise.all([
      this.userService.findById(userId),
      this.serviceService.findById(dto.serviceId),
    ]);

    const existing = await this.reviewRepository.findReviewByIds({
      userId: user.id,
      serviceId: service.id,
    });
    if (existing) {
      throw new ConflictException('Вы уже оставляли отзыв на эту услугу');
    }

    const newReview = {
      ...dto,
      user: { id: userId },
      service: { id: dto.serviceId },
    };
    const result = await this.reviewRepository.create(newReview);
    return result;
  }

  async getFilteredReviews(
    serviceId: string,
    query: PageOptionsReviewDto,
  ): Promise<IListResponseReviews> {
    const result = await this.reviewRepository.getReviews(serviceId, query);
    return result;
  }

  async findById(id: string): Promise<IReview> {
    const review = await this.reviewRepository.findById(id);
    if (!review) {
      throw new NotFoundException(`Отзыв ${id} не найден`);
    }

    return review;
  }

  async update(userId: string, dto: IUpdateReview): Promise<IReview> {
    const review = await this.findById(dto.id);

    if (review.user.id !== userId) {
      throw new ForbiddenException('Вы не можете редактировать чужой отзыв');
    }

    if (!this.isEditableWithin(review.createdAt, 24)) {
      throw new BadRequestException('Редактирование возможно только в течение 24 часов');
    }

    const updatedReview = {
      ...review,
      ...dto,
      id: review.id,
      updatedAt: new Date(),
    };
    await this.reviewRepository.update(updatedReview);
    return updatedReview;
  }

  public async remove(userId: string, id: string): Promise<void> {
    const review = await this.findById(id);

    if (review.user.id !== userId) {
      throw new ForbiddenException('Вы не можете редактировать чужой отзыв');
    }

    await this.reviewRepository.delete(review);
  }

  private isEditableWithin(createdAt: Date, hoursLimit = 24): boolean {
    const now = new Date();
    const diffMs = now.getTime() - new Date(createdAt).getTime();
    const hoursPassed = diffMs / (1000 * 60 * 60);
    return hoursPassed <= hoursLimit;
  }

  async uploadImages(
    userId: string,
    reviewId: string,
    files?: Express.Multer.File[],
  ): Promise<IReview> {
    const review = await this.findById(reviewId);
    if (review.user.id !== userId) {
      throw new ForbiddenException('Вы не можете редактировать чужой отзыв');
    }

    if (files && Object.keys(files).length) {
      let uploadedImageUrls: string[] = [];
      uploadedImageUrls = (
        await this.uploadService.uploadMultipleImages(files['images'])
      ).map((res) => res.secure_url);

      review.photos = uploadedImageUrls;
      await this.reviewRepository.update(review);
    }

    return review;
  }
}
