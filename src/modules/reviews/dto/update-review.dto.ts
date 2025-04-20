import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IUpdateReview } from '../interfaces/reviews.interface';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { IsDateValid } from 'shared/validators/is-date-valid';
import { IsPastDate } from 'shared/validators/is-past-date.validator';
import { Transform } from 'class-transformer';
import { DtoMessages } from 'shared/messages/dto.messages';
import { LikedAspectEnum, UsageType } from '../interfaces/reviews.enum';

export class UpdateReviewDto implements IUpdateReview {
  @ApiProperty({
    description: 'ID услуги',
  })
  @IsString()
  id: string;

  @ApiPropertyOptional({
    description: 'Отзыв',
  })
  @IsOptional()
  @IsString()
  @MinLength(5, { message: DtoMessages.minLength })
  @MaxLength(2000, { message: DtoMessages.maxLength })
  content?: string;

  @ApiPropertyOptional({
    description: 'Оценка услуги',
  })
  @IsOptional()
  @Max(5)
  @Min(1)
  @IsInt()
  @IsPositive({ message: DtoMessages.isPositive })
  rating?: number;

  @ApiPropertyOptional({
    description: 'Что понравилось (можно выбрать несколько)',
    isArray: true,
    enum: LikedAspectEnum,
  })
  @IsOptional()
  @IsArray()
  likedAspects?: LikedAspectEnum[];

  @ApiPropertyOptional({
    description: 'Понравилось: другое',
  })
  @IsOptional()
  @IsString()
  @MinLength(5, { message: DtoMessages.minLength })
  @MaxLength(20, { message: DtoMessages.maxLength })
  customLikedAspect?: string;

  @ApiPropertyOptional({
    description: 'Что можно улучшить?',
  })
  @IsOptional()
  @IsString()
  @MinLength(5, { message: DtoMessages.minLength })
  @MaxLength(2000, { message: DtoMessages.maxLength })
  suggestion?: string;

  @ApiPropertyOptional({
    description: 'Вы пользовались этой услугой',
    enum: UsageType,
  })
  @IsOptional()
  @IsEnum(UsageType)
  usageType?: UsageType;

  @ApiPropertyOptional({
    description: 'Рекомендовали бы другим?',
  })
  @IsOptional()
  @IsBoolean()
  isRecommended?: boolean;

  @ApiPropertyOptional({
    description: 'Когда пользовались услугой?',
  })
  @IsOptional()
  @Transform((p) => new Date(p.value))
  @IsDateValid()
  @IsPastDate()
  experienceDate?: Date;

  @ApiPropertyOptional({
    description: 'Фотографии',
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(3, { message: DtoMessages.maxLengthArray })
  photos?: [];
}
