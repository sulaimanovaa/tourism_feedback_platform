import { InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/users.entity';
import { ICreateUser, IUpdateUser, IUser } from './interfaces/users.interface';
import { Repository } from 'typeorm';
import { IListResponse } from 'shared/interfaces/pagination.interface';
import { PageOptionsDto } from './dto/page-options.dto';

export class UserRepository {
  private readonly logger: Logger;

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<IUser>,
  ) {
    this.logger = new Logger(UserRepository.name);
  }

  async findUserById(id: string): Promise<IUser | undefined> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id: id,
          isDeleted: false,
          isVerified: true,
        },
      });
      return user;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`${this.findUserById.name} - ${error.message}`);
      }
      throw new InternalServerErrorException();
    }
  }

  async findDeletedUserById(id: string): Promise<IUser | undefined> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id: id,
          isDeleted: true,
        },
      });
      return user;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`${this.findDeletedUserById.name} - ${error.message}`);
      }
      throw new InternalServerErrorException();
    }
  }

  public async create(props: ICreateUser): Promise<IUser> {
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

  public async update(props: IUpdateUser): Promise<void> {
    try {
      await this.userRepository.update(props.id, props);
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(error.message);
      }
      throw new InternalServerErrorException();
    }
  }

  async findAllCompanies(query: PageOptionsDto): Promise<IListResponse<IUser>> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    if (query.sortField && query.sortOrder) {
      queryBuilder.orderBy(`user.${query.sortField}`, query.sortOrder);
    }

    if (query.search) {
      const searchParams = query.search.toLowerCase();
      queryBuilder
        .where('LOWER(user.name) LIKE :search', {
          search: `%${searchParams}%`,
        })
        .orWhere('LOWER(user.address) LIKE :search', {
          search: `%${searchParams}%`,
        });
    }

    queryBuilder.take(query.limit).skip(query.skip);

    const totalCount = await queryBuilder.getCount();
    const items = await queryBuilder.getMany();

    return { totalCount, items };
  }

  async findUsername(username: string): Promise<IUser | undefined> {
    try {
      const user = await this.userRepository.findOne({
        where: { username },
      });
      return user;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`${this.findUsername.name} - ${error.message}`);
      }
      throw new InternalServerErrorException();
    }
  }

}
