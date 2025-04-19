import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceEntity } from 'entities/services.entity';
import { ServiceRepository } from './services.repository';
import { UploadModule } from 'modules/upload/upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceEntity]), UploadModule],
  controllers: [ServicesController],
  providers: [ServicesService, ServiceRepository],
  exports: [ServicesService],
})
export class ServicesModule {}
