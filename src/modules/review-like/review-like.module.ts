import { Module } from '@nestjs/common';
import { ReviewLikeService } from './review-like.service';
import { ReviewLikeController } from './review-like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewLikeEntity } from 'entities/review-like.entity';
import { ReviewLikeRepository } from './review-like.repository';
import { ReviewsModule } from '../reviews/reviews.module';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewLikeEntity]), ReviewsModule],
  controllers: [ReviewLikeController],
  providers: [ReviewLikeService, ReviewLikeRepository],
})
export class ReviewLikeModule {}
