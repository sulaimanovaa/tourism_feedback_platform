import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FollowsRepository } from './follows.repository';
import { UsersService } from '../users/users.service';
import { FollowDto } from './dto/follow.dto';
import { IFollows, IFollowsCount } from './interfaces/follows.interface';

@Injectable()
export class FollowsService {
  constructor(
    private readonly followRepository: FollowsRepository,
    private readonly userService: UsersService,
  ) {}

  async followUser(followerId: string, dto: FollowDto): Promise<IFollows> {
    const followIds = {
      followerId,
      followingId: dto.followingId,
    };

    if (followerId === dto.followingId) {
      throw new BadRequestException('Нельзя подписаться на себя');
    }

    await this.userService.findById(dto.followingId);

    const existing = await this.followRepository.findOne(followIds);
    if (existing) {
      throw new ConflictException('Вы уже подписаны');
    }

    const follow = await this.followRepository.saveFollow(followIds);
    return follow;
  }

  async unfollowUser(followerId: string, dto: FollowDto): Promise<void> {
    const followIds = {
      followerId,
      followingId: dto.followingId,
    };

    const follow = await this.followRepository.findOne(followIds);
    if (!follow) {
      throw new NotFoundException('Подписка не найдена');
    }

    await this.followRepository.deleteFollow(follow);
  }

  async getFollowers(userId: string): Promise<IFollows[]> {
    const follows = await this.followRepository.findAllFollowers(userId);
    return follows;
  }

  async getFollowing(userId: string): Promise<IFollows[]> {
    const follows = await this.followRepository.findAllFollowing(userId);
    return follows;
  }

  async getFollowCounts(userId: string): Promise<IFollowsCount> {
    const follows = await this.followRepository.getFollowCounts(userId);
    return follows;
  }
}
