import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  UploadedFiles,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ControllerDecorator } from 'shared/decorators/controller.decorator';
import { ApiCreateService } from './decorators/create-service.decorator';
import { ApiGetListService } from './decorators/get-list-service.decorator';
import { ApiGetServiceById } from './decorators/get-service-by-id.decorator';
import { ApiUpdateService } from './decorators/update-service.decorator';
import { ApiDeleteService } from './decorators/delete-service.decorator';
import { IService } from './interfaces/services.interface';
import { IListResponse } from 'shared/interfaces/pagination.interface';
import { PageOptionsServiceDto } from './dto/page-options-service.dto';
import { CurrentUserId } from 'shared/decorators/current-user.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'shared/guards/jwt.guards';
import { UploadImages } from 'shared/decorators/upload-images.decorator';
import { ApiUploadImage } from 'shared/decorators/api-upload-image.decorator';

@ControllerDecorator('services')
@ApiBearerAuth('auth')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @ApiCreateService()
  @Post()
  @UseGuards(AuthGuard)
  async create(@CurrentUserId() user, @Body() dto: CreateServiceDto): Promise<IService> {
    const service = await this.servicesService.create(user, dto);
    return service;
  }

  @ApiGetListService()
  @Get()
  async findAll(@Query() query: PageOptionsServiceDto): Promise<IListResponse<IService>> {
    const service = await this.servicesService.findAll(query);
    return service;
  }

  @ApiGetServiceById()
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<IService> {
    const service = await this.servicesService.findById(id);
    return service;
  }

  @ApiUpdateService()
  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(@CurrentUserId() user, @Body() dto: UpdateServiceDto): Promise<IService> {
    const service = await this.servicesService.update(user, dto);
    return service;
  }

  @ApiDeleteService()
  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(
    @CurrentUserId() user,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    const service = await this.servicesService.remove(user, id);
    return service;
  }

  @ApiUploadImage()
  @Patch('uploadImages/:serviceId')
  @UploadImages()
  @UseGuards(AuthGuard)
  async updateAvatar(
    @UploadedFiles() files: Express.Multer.File[],
    @CurrentUserId() userId,
    @Param('serviceId', new ParseUUIDPipe()) serviceId: string,
  ) {
    const result = await this.servicesService.uploadImages(userId, serviceId, files);
    return result;
  }
}
