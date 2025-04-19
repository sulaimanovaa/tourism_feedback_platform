import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MailService } from '../mail/mail.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'entities/users.entity';
import { PasswordResetTokenEntity } from 'entities/token.entity';
import { AuthRepository } from './auth.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, PasswordResetTokenEntity])],
  controllers: [AuthController],
  providers: [AuthService, MailService, AuthRepository],
})
export class AuthModule {}
