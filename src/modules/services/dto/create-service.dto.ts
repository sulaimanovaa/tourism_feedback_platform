import {
  IsOptional,
  IsString,
  IsNumber,
  IsEnum,
  IsArray,
  ArrayMaxSize,
  MaxLength,
  MinLength,
  IsPositive,
} from 'class-validator';
import { ICreateService } from '../interfaces/services.interface';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DtoMessages } from 'shared/messages/dto.messages';
import { LocationEnum, ServiceCategoryEnum } from '../interfaces/services.enums';

export class CreateServiceDto implements ICreateService {
  @ApiProperty({
    description: 'Название услуги',
  })
  @MinLength(5, { message: DtoMessages.minLength })
  @MaxLength(20, { message: DtoMessages.maxLength })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Описание услуги',
  })
  @IsString()
  @MinLength(5, { message: DtoMessages.minLength })
  @MaxLength(2000, { message: DtoMessages.maxLength })
  description: string;

  @ApiPropertyOptional({
    description: 'Фотографии',
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
  @IsPositive({ message: DtoMessages.isPositive })
  price?: number;

  @ApiProperty({
    description: 'Категория услуги',
    enum: ServiceCategoryEnum,
  })
  @IsEnum(ServiceCategoryEnum)
  category: ServiceCategoryEnum;

  @ApiPropertyOptional({
    description: 'Продолжительность услуги',
    required: false,
  })
  @IsOptional()
  @MinLength(5, { message: DtoMessages.minLength })
  @MaxLength(10, { message: DtoMessages.maxLength })
  @IsString()
  duration: string;

  @ApiProperty({
    description: 'Местоположение',
    enum: LocationEnum,
  })
  @IsEnum(LocationEnum)
  region: LocationEnum;

  @ApiPropertyOptional({
    description: 'Точный адрес',
  })
  @IsOptional()
  @IsString()
  @MinLength(5, { message: DtoMessages.minLength })
  @MaxLength(50, { message: DtoMessages.maxLength })
  address: string;
}
