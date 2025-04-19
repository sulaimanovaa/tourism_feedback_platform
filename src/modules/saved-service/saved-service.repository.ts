import { InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SavedServiceEntity } from 'entities/saved-service.entity';
import { Repository } from 'typeorm';
import { ISavedService, ISaveServiceIds } from './interfaces/saved-service.interface';
export class SavedServiceRepository {
  private readonly logger: Logger;

  constructor(
    @InjectRepository(SavedServiceEntity)
    private readonly savedRepository: Repository<ISavedService>,
  ) {
    this.logger = new Logger(SavedServiceEntity.name);
  }

  async findOneByIds(props: ISaveServiceIds): Promise<ISavedService | undefined> {
    try {
      const result = await this.savedRepository.findOne({
        where: {
          user: { id: props.userId },
          service: { id: props.serviceId },
        },
      });
      return result;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`${this.findOneByIds.name} - ${error.message}`);
      }
      throw new InternalServerErrorException();
    }
  }

  async save(props: ISaveServiceIds): Promise<ISavedService | undefined> {
    try {
      const result = await this.savedRepository.create({
        user: { id: props.userId },
        service: { id: props.serviceId },
      });
      await this.savedRepository.save(result);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`${this.save.name} - ${error.message}`);
      }
      throw new InternalServerErrorException();
    }
  }

  async delete(props: ISavedService): Promise<void> {
    try {
      await this.savedRepository.remove(props);
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`${this.delete.name} - ${error.message}`);
      }
      throw new InternalServerErrorException();
    }
  }

  async findByUserId(userId: number): Promise<ISavedService[]> {
    try {
      const result = await this.savedRepository.find({
        where: {
          user: { id: userId },
        },
        relations: ['service'],
      });
      return result;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`${this.findByUserId.name} - ${error.message}`);
      }
      throw new InternalServerErrorException();
    }
  }
}
