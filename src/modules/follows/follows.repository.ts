import { InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FollowEntity } from 'entities/follow.entity';
import { Repository } from 'typeorm';
import { IFollows, IFollowIds, IFollowsCount } from './interfaces/follows.interface';

export class FollowsRepository {
  private readonly logger: Logger;

  constructor(
    @InjectRepository(FollowEntity)
    private readonly followRepository: Repository<IFollows>,
  ) {
    this.logger = new Logger(FollowEntity.name);
  }

  async findOne(props: IFollowIds): Promise<IFollows | undefined> {
    try {
      const user = await this.followRepository.findOne({
        where: {
          follower: { id: props.followerId },
          following: { id: props.followingId },
        },
      });
      return user;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`${this.findOne.name} - ${error.message}`);
      }
      throw new InternalServerErrorException();
    }
  }

  async saveFollow(props: IFollowIds): Promise<IFollows | undefined> {
    try {
      const follow = await this.followRepository.create({
        follower: { id: props.followerId },
        following: { id: props.followingId },
      });
      await this.followRepository.save(follow);
      return follow;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`${this.saveFollow.name} - ${error.message}`);
      }
      throw new InternalServerErrorException();
    }
  }

  async findAllFollowers(userId: string): Promise<IFollows[] | undefined> {
    try {
      const followers = await this.followRepository.find({
        where: { following: { id: userId } },
        relations: ['follower'],
      });
      return followers;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`${this.findAllFollowers.name} - ${error.message}`);
      }
      throw new InternalServerErrorException();
    }
  }

  async findAllFollowing(userId: string): Promise<IFollows[] | undefined> {
    try {
      const followers = await this.followRepository.find({
        where: { follower: { id: userId } },
        relations: ['following'],
      });
      return followers;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`${this.findAllFollowing.name} - ${error.message}`);
      }
      throw new InternalServerErrorException();
    }
  }

  async getFollowCounts(userId: string): Promise<IFollowsCount | undefined> {
    try {
      const [followersCount, followingCount] = await Promise.all([
        this.followRepository.count({
          where: {
            following: { id: userId },
          },
        }),
        this.followRepository.count({
          where: {
            follower: { id: userId },
          },
        }),
      ]);
      return { followersCount, followingCount };
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`${this.getFollowCounts.name} - ${error.message}`);
      }
      throw new InternalServerErrorException();
    }
  }

  async deleteFollow(props: IFollows): Promise<void> {
    try {
      await this.followRepository.remove(props);
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`${this.saveFollow.name} - ${error.message}`);
      }
      throw new InternalServerErrorException();
    }
  }
}
