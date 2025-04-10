import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { IUpdateUser } from '../interfaces/user.models';

export class UpdateUserDto implements IUpdateUser {
  @ApiProperty({
    description: 'id задачи в бд',
    example: 1,
    required: true,
  })
  @IsNumber()
  id: number;

  @ApiPropertyOptional({
    description: 'nickname',
    required: false,
  })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional({
    description: 'nickname',
    required: false,
  })
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiPropertyOptional({
    description: 'nickname',
    required: false,
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({
    description: 'nickname',
    required: false,
  })
  @IsOptional()
  @IsString()
  contact?: string;

  @ApiPropertyOptional({
    description: 'nickname',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'nickname',
    required: false,
  })
  @IsOptional()
  @IsString()
  nickname?: string;
}