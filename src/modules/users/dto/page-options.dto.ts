import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { SortOrderEnum } from '../../../shared/models/pagination.models';
import { UserSortFields } from '../interfaces/users.interface';
import { PaginateRequest } from 'shared/dtos/paginate-request.dto';

export class PageOptionsDto extends PaginateRequest {
  @ApiPropertyOptional({
    enum: UserSortFields,
  })
  @IsOptional()
  sortField: UserSortFields;

  @ApiPropertyOptional({
    enum: SortOrderEnum,
  })
  @IsOptional()
  sortOrder: SortOrderEnum;

  @ApiPropertyOptional()
  @IsOptional()
  search: string;
}
