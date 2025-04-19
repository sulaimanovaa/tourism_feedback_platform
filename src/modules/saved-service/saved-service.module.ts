import { Module } from '@nestjs/common';
import { SavedServiceService } from './saved-service.service';
import { SavedServiceController } from './saved-service.controller';
import { SavedServiceEntity } from 'entities/saved-service.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SavedServiceRepository } from './saved-service.repository';
import { ServicesModule } from '../services/services.module';

@Module({
  imports: [TypeOrmModule.forFeature([SavedServiceEntity]), ServicesModule],
  controllers: [SavedServiceController],
  providers: [SavedServiceService, SavedServiceRepository],
})
export class SavedServiceModule {}
