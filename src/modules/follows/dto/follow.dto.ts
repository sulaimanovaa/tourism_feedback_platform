import { IsNotEmpty, IsNumber } from 'class-validator';
import { IFollowDto } from '../interfaces/follows.interface';
import { ApiProperty } from '@nestjs/swagger';

export class FollowDto implements IFollowDto {
  @ApiProperty({
    description: 'Подписаться на',
  })
  @IsNumber()
  @IsNotEmpty()
  followingId: number;
}
