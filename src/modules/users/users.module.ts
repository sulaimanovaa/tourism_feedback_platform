import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'entities/users.entity';
import { UserRepository } from './users.repository';
import { UploadModule } from 'modules/upload/upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), UploadModule],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  exports: [UsersService],
})
export class UsersModule {}
