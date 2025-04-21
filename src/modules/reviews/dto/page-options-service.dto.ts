import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { SortOrderEnum } from '../../../shared/interfaces/pagination.interface';
import { PaginateRequest } from 'shared/dtos/paginate-request.dto';
import { ReviewFilterType } from '../interfaces/reviews.enum';

export class PageOptionsReviewDto extends PaginateRequest {
  @ApiPropertyOptional({
    enum: ReviewFilterType,
  })
  @IsOptional()
  filter?: ReviewFilterType;

  @ApiPropertyOptional({
    enum: SortOrderEnum,
  })
  @IsOptional()
  sortOrder?: SortOrderEnum;
}
