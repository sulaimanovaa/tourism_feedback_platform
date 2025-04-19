import { ApiPropertyOptional } from '@nestjs/swagger';
import { DefaultPageLimit, IPaginationRequest } from '../models/pagination.models';
import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginateRequest implements IPaginationRequest {
  @ApiPropertyOptional({
    required: false,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  public page: number;

  @ApiPropertyOptional({
    required: false,
    maximum: DefaultPageLimit,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  public limit: number = DefaultPageLimit;

  get skip(): number {
    return ((this.page ?? 1) - 1) * (this.limit ?? DefaultPageLimit);
  }
}
