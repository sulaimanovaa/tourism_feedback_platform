import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { ReviewEntity } from 'entities/reviews.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewRepository } from './reviews.repository';
import { UsersModule } from '../users/users.module';
import { ServicesModule } from '../services/services.module';
import { UploadModule } from 'modules/upload/upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewEntity]), UsersModule, ServicesModule, UploadModule],
  controllers: [ReviewsController],
  providers: [ReviewsService, ReviewRepository],
  exports: [ReviewsService],
})
export class ReviewsModule {}
