import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IUpdateService } from '../interfaces/services.interface';
import {
  ArrayMaxSize,
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { DtoMessages } from 'shared/messages/dto.messages';
import { LocationEnum, ServiceCategoryEnum } from '../interfaces/services.enums';

export class UpdateServiceDto implements IUpdateService {
  @ApiProperty({
    description: 'ID услуги',
  })
  @IsUUID()
  id: string;

  @ApiPropertyOptional({
    description: 'Название услуги',
  })
  @IsOptional()
  @IsString()
  @MinLength(5, { message: DtoMessages.minLength })
  @MaxLength(20, { message: DtoMessages.maxLength })
  title: string;

  @ApiPropertyOptional({
    description: 'Описание услуги',
  })
  @IsOptional()
  @IsString()
  @MinLength(5, { message: DtoMessages.minLength })
  @MaxLength(2000, { message: DtoMessages.maxLength })
  description: string;

  @ApiPropertyOptional({
    description: 'файлы',
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(3, { message: DtoMessages.maxLengthArray })
  photos?: [];

  @ApiPropertyOptional({
    description: 'Ссылка на источник/компанию',
    required: false,
  })
  @IsOptional()
  @IsString()
  sourceUrl?: string;

  @ApiPropertyOptional({
    description: 'Цена за услугу',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiPropertyOptional({
    description: 'Категория услуги',
    enum: ServiceCategoryEnum,
  })
  @IsOptional()
  @IsEnum(ServiceCategoryEnum)
  category: ServiceCategoryEnum;

  @ApiPropertyOptional({
    description: 'Продолжительность услуги',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(5, { message: DtoMessages.minLength })
  @MaxLength(20, { message: DtoMessages.maxLength })
  duration: string;

  @ApiProperty({
    description: 'Местоположение',
    enum: LocationEnum,
  })
  @IsOptional()
  @IsEnum(LocationEnum)
  region: LocationEnum;

  @ApiProperty({
    description: 'Точный адрес',
  })
  @IsOptional()
  @IsString()
  @MinLength(5, { message: DtoMessages.minLength })
  @MaxLength(50, { message: DtoMessages.maxLength })
  address: string;
}
