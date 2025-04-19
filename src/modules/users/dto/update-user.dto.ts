import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { IUpdateUser } from '../interfaces/users.interface';
import { DtoMessages } from 'shared/messages/dto.messages';

export class UpdateUserDto implements IUpdateUser {
  @ApiPropertyOptional({
    description: 'Описание профиля',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(200, { message: DtoMessages.maxLength })
  bio?: string;

  @ApiPropertyOptional({
    description: 'Имя',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(1, { message: DtoMessages.minLength })
  @MaxLength(30, { message: DtoMessages.maxLength })
  name?: string;

  @ApiPropertyOptional({
    description: 'Никнейм',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(1, { message: DtoMessages.minLength })
  @MaxLength(30, { message: DtoMessages.maxLength })
  username?: string;
}
