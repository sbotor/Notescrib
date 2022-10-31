export interface PagingRequest {
  pageNumber: number;
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
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPageCount: number;
}
