export interface PagingRequest {
  page: number;
  pageSize: number;
}

export interface SortingRequest {
  direction: SortingDirection;
  orderBy: string;
}

export enum SortingDirection {
  Ascending,
  Descending,
}

export interface PagedList<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPageCount: number;
}
