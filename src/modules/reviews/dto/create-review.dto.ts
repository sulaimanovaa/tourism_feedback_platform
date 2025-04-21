import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ICreateReview } from '../interfaces/reviews.interface';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
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

export class CreateReviewDto implements ICreateReview {
  @ApiProperty({
    description: 'ID услуги',
  })
  @IsUUID()
  serviceId: string;

  @ApiProperty({
    description: 'Оценка услуги',
  })
  @Max(5)
  @Min(1)
  @IsInt()
  @IsPositive({ message: DtoMessages.isPositive })
  rating: number;

  @ApiProperty({
    description: 'Отзыв',
  })
  @IsString()
  @MinLength(5, { message: DtoMessages.minLength })
  @MaxLength(2000, { message: DtoMessages.maxLength })
  content: string;

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

  @ApiProperty({
    description: 'Вы пользовались этой услугой',
    enum: UsageType,
  })
  @IsEnum(UsageType)
  usageType: UsageType;

  @ApiProperty({
    description: 'Рекомендовали бы другим?',
  })
  @IsBoolean()
  isRecommended: boolean;

  @ApiPropertyOptional({
    description: 'Когда пользовались услугой?',
  })
  @IsOptional()
  @Transform((p) => new Date(p.value))
  @IsDateValid()
  @IsPastDate()
  experienceDate?: Date;
}
