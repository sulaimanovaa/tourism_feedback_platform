import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { SortOrderEnum } from '../../../shared/interfaces/pagination.interface';
import { PaginateRequest } from 'shared/dtos/paginate-request.dto';
import { LocationEnum, ServiceCategoryEnum, ServiceSortByEnum } from '../interfaces/services.enums';

export class PageOptionsServiceDto extends PaginateRequest {
  @ApiPropertyOptional({
    enum: ServiceCategoryEnum,
  })
  @IsOptional()
  category: ServiceCategoryEnum;

  @ApiPropertyOptional({
    enum: LocationEnum,
  })
  @IsOptional()
  region: LocationEnum;

  @ApiPropertyOptional({
    enum: SortOrderEnum,
  })
  @IsOptional()
  sortOrder: SortOrderEnum;

  @ApiPropertyOptional({
    enum: ServiceSortByEnum,
  })
  @IsOptional()
  sortBy: ServiceSortByEnum;
}
