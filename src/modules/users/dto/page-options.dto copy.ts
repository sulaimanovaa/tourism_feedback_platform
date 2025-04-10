import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { SortOrderEnum } from '../../../shared/models/pagination.models';
import { UserSortFields } from '../interfaces/user.models';
import { PaginateRequest } from 'src/shared/dtos/paginate-request.dto';

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
