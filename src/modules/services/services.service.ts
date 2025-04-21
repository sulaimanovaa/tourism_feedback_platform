import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ICreateService, IService, IUpdateService } from './interfaces/services.interface';
import { IListResponse } from 'shared/interfaces/pagination.interface';
import { PageOptionsServiceDto } from './dto/page-options-service.dto';
import { ServiceRepository } from './services.repository';
import { UploadService } from 'modules/upload/upload.service';

@Injectable()
export class ServicesService {
  constructor(
    private readonly serviceRepository: ServiceRepository,
    private readonly uploadService: UploadService,
  ) {}

  async create(userId: string, dto: ICreateService): Promise<IService> {
    const existing = await this.serviceRepository.findByTitle(dto);
    if (existing) {
      throw new BadRequestException('Такая услуга уже добавлена');
    }

    const newService = {
      ...dto,
      user: {
        id: userId,
      },
    };
    const service = await this.serviceRepository.create(newService);
    return service;
  }

  async findAll(query: PageOptionsServiceDto): Promise<IListResponse<IService>> {
    const result = await this.serviceRepository.findAllServices(query);
    return result;
  }

  async findById(id: string): Promise<IService> {
    const service = await this.serviceRepository.findById(id);
    if (!service) {
      throw new NotFoundException(`Туристическая услуга ${id} не найдена`);
    }

    return service;
  }

  async update(userId: string, dto: IUpdateService): Promise<IService> {
    const service = await this.findById(dto.id);
    if (service.user.id !== userId) {
      throw new ForbiddenException('Вы не можете редактировать чужую услугу');
    }

    const existing = await this.serviceRepository.findByTitle({
      title: dto.title,
      region: dto.region,
      category: dto.category,
    });
    if (existing) {
      throw new BadRequestException('Такая услуга уже добавлена');
    }

    const updated = {
      ...service,
      ...dto,
      id: service.id,
      updatedAt: new Date(),
    };
    await this.serviceRepository.update(updated);
    return updated;
  }

  public async remove(userId: string, id: string): Promise<void> {
    const service = await this.findById(id);
    if (service.user.id !== userId) {
      throw new ForbiddenException('Вы не можете редактировать чужую услугу');
    }

    const deleted = {
      ...service,
      id: service.id,
      isDeleted: true,
      updatedAt: new Date(),
    };
    await this.serviceRepository.update(deleted);
  }

  async uploadImages(
    userId: string,
    serviceId: string,
    files?: Express.Multer.File[],
  ): Promise<IService> {
    const service = await this.findById(serviceId);
    if (service.user.id !== userId) {
      throw new ForbiddenException('Вы не можете редактировать чужую услугу');
    }

    if (files && Object.keys(files).length) {
      let uploadedImageUrls: string[] = [];
      uploadedImageUrls = (
        await this.uploadService.uploadMultipleImages(files['images'])
      ).map((res) => res.secure_url);

      service.photos = uploadedImageUrls;
      await this.serviceRepository.update(service);
    }

    return service;
  }
}
