import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  UseGuards,
  UploadedFiles,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ControllerDecorator } from 'shared/decorators/controller.decorator';
import { ApiCreateReview } from './decorators/create-review.decorator';
import { ApiGetReviewById } from './decorators/get-review-by-id.decorator';
import { ApiDeleteReview } from './decorators/delete-review.decorator';
import { ApiUpdateReview } from './decorators/update-reviews.decorator';
import { IListResponseReviews, IReview } from './interfaces/reviews.interface';
import { ApiGetListReviews } from './decorators/get-list-reviews.decorator';
import { PageOptionsReviewDto } from './dto/page-options-service.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'shared/guards/jwt.guards';
import { CurrentUserId } from 'shared/decorators/current-user.decorator';
import { UploadImages } from 'shared/decorators/upload-images.decorator';
import { ApiUploadImage } from 'shared/decorators/api-upload-image.decorator';

@ControllerDecorator('reviews')
@ApiBearerAuth('auth')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @ApiCreateReview()
  @Post()
  @UseGuards(AuthGuard)
  async create(@CurrentUserId() user, @Body() dto: CreateReviewDto): Promise<IReview> {
    const result = await this.reviewsService.create(user, dto);
    return result;
  }

  @ApiGetListReviews()
  @Get('get-all/:serviceId')
  async findAll(
    @Param('serviceId', ParseIntPipe) serviceId: number,
    @Query() query: PageOptionsReviewDto,
  ): Promise<IListResponseReviews> {
    const result = await this.reviewsService.getFilteredReviews(serviceId, query);
    return result;
  }

  @ApiGetReviewById()
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IReview> {
    const result = await this.reviewsService.findById(+id);
    return result;
  }

  @ApiUpdateReview()
  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(@CurrentUserId() user, @Body() dto: UpdateReviewDto): Promise<IReview> {
    const result = await this.reviewsService.update(user, dto);
    return result;
  }

  @ApiDeleteReview()
  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@CurrentUserId() user, @Param('id') id: string): Promise<void> {
    await this.reviewsService.remove(user, +id);
  }

  @ApiUploadImage()
  @Patch('uploadImages/:reviewId')
  @UploadImages()
  @UseGuards(AuthGuard)
  async updateAvatar(
    @UploadedFiles() files: Express.Multer.File[],
    @CurrentUserId() userId,
    @Param('reviewId', ParseIntPipe) reviewId: number,
  ) {
    const result = await this.reviewsService.uploadImages(userId, reviewId, files);
    return result;
  }
}
