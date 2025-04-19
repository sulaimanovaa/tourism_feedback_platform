import { Get, Post, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ReviewLikeService } from './review-like.service';
import { IReviewLikesCount, IReviewLikeStatus } from './interfaces/review-like.interface';
import { ControllerDecorator } from 'shared/decorators/controller.decorator';
import { ApiToggleLikeReview } from './decorators/toggle-review-like.decorator';
import { ApiGetReviewLikeCount } from './decorators/get-review-like-count.decorator';
import { CurrentUserId } from 'shared/decorators/current-user.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'shared/guards/jwt.guards';

@ControllerDecorator('review-like')
@ApiBearerAuth('auth')
export class ReviewLikeController {
  constructor(private readonly reviewLikeService: ReviewLikeService) {}

  @ApiToggleLikeReview()
  @Post('toggle/:reviewId')
  @UseGuards(AuthGuard)
  async toggleLike(
    @CurrentUserId() userId,
    @Param('reviewId', ParseIntPipe) reviewId: number,
  ): Promise<IReviewLikeStatus> {
    const like = await this.reviewLikeService.toggleLike({ userId, reviewId });
    return like;
  }

  @ApiGetReviewLikeCount()
  @Get('count/:reviewId')
  async getLikesCount(
    @Param('reviewId', ParseIntPipe) reviewId: number,
  ): Promise<IReviewLikesCount> {
    const count = await this.reviewLikeService.getLikesCount(reviewId);
    return count;
  }
}
