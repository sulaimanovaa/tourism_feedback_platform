import { InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/users.entity';
import { Repository } from 'typeorm';
import { PasswordResetTokenEntity } from 'entities/token.entity';
import {
  ICreatePasswordReset,
  IPasswordTokenReset,
  IRegistUser,
} from './interfaces/auth.interface';
import { IUser } from '../users/interfaces/users.interface';

export class AuthRepository {
  private readonly logger: Logger;

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<IUser>,
    @InjectRepository(PasswordResetTokenEntity)
    private readonly tokenRepository: Repository<PasswordResetTokenEntity>,
  ) {
    this.logger = new Logger(AuthRepository.name);
  }

  async saveToken(props: ICreatePasswordReset): Promise<IPasswordTokenReset> {
    try {
      const result = await this.tokenRepository.save(props);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`${this.saveToken.name} - ${error.message}`);
      }
      throw new InternalServerErrorException();
    }
  }

  async findUserByEmail(email: string): Promise<IUser | undefined> {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
      });
      return user;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`${this.findUserByEmail.name} - ${error.message}`);
      }
      throw new InternalServerErrorException();
    }
  }

  async findToken(id: string): Promise<IPasswordTokenReset | undefined> {
    try {
      const result = await this.tokenRepository.findOne({
        where: { id },
        relations: ['user'],
      });
      return result;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`${this.findToken.name} - ${error.message}`);
      }
      throw new InternalServerErrorException();
    }
  }

  async updateUser(user: IUser): Promise<IUser> {
    try {
      const result = await this.userRepository.save(user);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`${this.updateUser.name} - ${error.message}`);
      }
      throw new InternalServerErrorException();
    }
  }

  async createUser(props: IRegistUser): Promise<IUser> {
    try {
      const instance = this.userRepository.create(props);
      const result = await this.userRepository.save(instance);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(error.message);
      }
      throw new InternalServerErrorException();
    }
  }

  async removePreviousTokens(userId: string): Promise<void> {
    try {
      await this.tokenRepository.delete({ user: { id: userId } });
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`${this.removePreviousTokens.name} - ${error.message}`);
      }
      throw new InternalServerErrorException();
    }
  }

  async findLastPassword(userId: string): Promise<IPasswordTokenReset | undefined> {
    try {
      const result = await this.tokenRepository.findOne({
        where: { user: { id: userId } },
        order: { createdAt: 'DESC' },
      });
      return result;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`${this.removePreviousTokens.name} - ${error.message}`);
      }
      throw new InternalServerErrorException();
    }
  }

  public async activateUser(userId: string): Promise<void> {
    try {
      await this.userRepository.update(userId, {
        isDeleted: false,
      });
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(error.message);
      }
      throw new InternalServerErrorException();
    }
  }
}
