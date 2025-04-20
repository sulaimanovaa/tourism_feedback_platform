import { Get, Post, Body, Param, Delete, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { FollowsService } from './follows.service';
import { AuthGuard } from 'shared/guards/jwt.guards';
import { ControllerDecorator } from 'shared/decorators/controller.decorator';
import { FollowDto } from './dto/follow.dto';
import { ApiCreateFollow } from './decorators/create-follow.decorator';
import { ApiDeleteFollow } from './decorators/delete-follow.decorator';
import { ApiGetFollowersById } from './decorators/get-followers-by-id.decorator';
import { ApiGetFollowingById } from './decorators/get-followings-by-id.decorator';
import { ApiGetFollowCounts } from './decorators/get-follows-count.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { IFollows, IFollowsCount } from './interfaces/follows.interface';
import { CurrentUserId } from 'shared/decorators/current-user.decorator';

@ControllerDecorator('follows')
@ApiBearerAuth('auth')
export class FollowsController {
  constructor(private readonly followService: FollowsService) {}

  @ApiCreateFollow()
  @UseGuards(AuthGuard)
  @Post()
  async follow(@CurrentUserId() user, @Body() dto: FollowDto): Promise<IFollows> {
    const follow = await this.followService.followUser(user, dto);
    return follow;
  }

  @ApiDeleteFollow()
  @UseGuards(AuthGuard)
  @Delete()
  async unfollow(@CurrentUserId() user, @Body() dto: FollowDto): Promise<{ message: string }> {
    await this.followService.unfollowUser(user, dto);
    return { message: 'Успешно отписались' };
  }

  @ApiGetFollowersById()
  @Get('followers/:id')
  async getFollowers(@Param('id', new ParseUUIDPipe()) id: string): Promise<IFollows[]> {
    const result = await this.followService.getFollowers(id);
    return result;
  }

  @ApiGetFollowingById()
  @Get('following/:id')
  async getFollowing(@Param('id', new ParseUUIDPipe()) id: string): Promise<IFollows[]> {
    const result = await this.followService.getFollowing(id);
    return result;
  }

  @ApiGetFollowCounts()
  @Get('count/:id')
  async getFollowCounts(@Param('id', new ParseUUIDPipe()) id: string): Promise<IFollowsCount> {
    const result = await this.followService.getFollowCounts(id);
    return result;
  }
}
