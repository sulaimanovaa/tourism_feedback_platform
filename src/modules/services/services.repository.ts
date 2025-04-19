import { InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IListResponse } from 'shared/models/pagination.models';
import { ServiceEntity } from 'entities/services.entity';
import {
  ICreateService,
  IFindExisting,
  IService,
  IUpdateService,
} from './interfaces/services.interface';
import { PageOptionsServiceDto } from './dto/page-options-service.dto';
import { ServiceSortByEnum } from './interfaces/services.enums';

export class ServiceRepository {
  private readonly logger: Logger;

  constructor(
    @InjectRepository(ServiceEntity)
    private readonly serviceRepository: Repository<IService>,
  ) {
    this.logger = new Logger(ServiceEntity.name);
  }

  async findById(id: number): Promise<IService | undefined> {
    try {
      const service = await this.serviceRepository.findOne({
        where: {
          id: id,
          isDeleted: false,
        },
        relations: ['user'],
      });
      return service;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`${this.findById.name} - ${error.message}`);
      }
      throw new InternalServerErrorException();
    }
  }

  async findByTitle(props: IFindExisting): Promise<IService | undefined> {
    try {
      const normalizedTitle = props.title.trim().toLowerCase();
      const existing = await this.serviceRepository
        .createQueryBuilder('service')
        .where('LOWER(TRIM(service.title)) = :title', { title: normalizedTitle })
        .andWhere('service.category = :category', { category: props.category })
        .andWhere('service.region = :region', { region: props.region })
        .getOne();

      return existing;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`${this.findByTitle.name} - ${error.message}`);
      }
      throw new InternalServerErrorException();
    }
  }

  async findDeletedById(id: number): Promise<IService | undefined> {
    try {
      const service = await this.serviceRepository.findOne({
        where: {
          id: id,
          isDeleted: true,
        },
      });
      return service;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`${this.findDeletedById.name} - ${error.message}`);
      }
      throw new InternalServerErrorException();
    }
  }

  public async create(props: ICreateService): Promise<IService> {
    try {
      const instance = this.serviceRepository.create(props);
      const result = await this.serviceRepository.save(instance);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`${this.create.name} - ${error.message}`);
      }
      throw new InternalServerErrorException();
    }
  }

  public async update(props: IUpdateService): Promise<void> {
    try {
      await this.serviceRepository.update(props.id, props);
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`${this.update.name} - ${error.message}`);
      }
      throw new InternalServerErrorException();
    }
  }

  async findAllServices(query: PageOptionsServiceDto): Promise<IListResponse<IService>> {
    const queryBuilder = this.serviceRepository.createQueryBuilder('service');

    if (query.sortBy === ServiceSortByEnum.POPULARITY) {
      queryBuilder
        .leftJoin('saved_service', 'saved', 'saved.serviceId = service.id')
        .addSelect('COUNT(saved.id)', 'popularityScore')
        .groupBy('service.id');
    }

    if (query.category) {
      queryBuilder.andWhere('service.category = :category', { category: query.category });
    }

    if (query.region) {
      queryBuilder.andWhere('service.region = :region', { region: query.region });
    }

    if (query.sortBy === ServiceSortByEnum.RATING) {
      queryBuilder.orderBy('service.averageRating', query.sortOrder);
    } else if (query.sortBy === 'popularity') {
      queryBuilder.orderBy('popularityScore', query.sortOrder);
    }

    if (query.sortOrder) {
      queryBuilder.orderBy('service.createdAt', query.sortOrder);
    }

    queryBuilder.take(query.limit).skip(query.skip);

    const totalCount = await queryBuilder.getCount();
    const items = await queryBuilder.getMany();

    return { totalCount, items };
  }
}
