export interface IListResponse<T> extends IPaginationRequest {
  items: T[];
  totalCount: number;
}

export interface IPaginationRequest {
  page?: number;
  limit?: number;
}

export enum SortOrderEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}

export const DefaultPageLimit = 15;
