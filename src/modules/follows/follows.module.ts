import { Module } from '@nestjs/common';
import { FollowsService } from './follows.service';
import { FollowsController } from './follows.controller';
import { FollowsRepository } from './follows.repository';
import { FollowEntity } from 'entities/follow.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([FollowEntity]), UsersModule],
  controllers: [FollowsController],
  providers: [FollowsService, FollowsRepository],
})
export class FollowsModule {}
