import { Injectable } from '@nestjs/common';
import { SavedServiceRepository } from './saved-service.repository';
import {
  ISavedService,
  ISavedServiceStatus,
  ISaveServiceIds,
} from './interfaces/saved-service.interface';
import { ServicesService } from '../services/services.service';

@Injectable()
export class SavedServiceService {
  constructor(
    private readonly savedRepo: SavedServiceRepository,
    private readonly serviceService: ServicesService,
  ) {}

  async toggleSave(dto: ISaveServiceIds): Promise<ISavedServiceStatus> {
    await this.serviceService.findById(dto.serviceId);

    const existing = await this.savedRepo.findOneByIds(dto);
    if (existing) {
      await this.savedRepo.delete(existing);
      return { saved: false, message: 'Услуга удалена из сохранённых' };
    }

    await this.savedRepo.save(dto);
    return { saved: true, message: 'Услуга сохранена' };
  }

  async getSavedServices(userId: number): Promise<ISavedService[]> {
    const saved = await this.savedRepo.findByUserId(userId);
    return saved;
  }
}
