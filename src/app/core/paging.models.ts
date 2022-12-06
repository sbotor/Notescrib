export interface PagingInfo {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPageCount: number;
}

export interface PagedList<T> extends PagingInfo {
  data: T[];
}

export interface PagingRequest {
  page?: number;
  pageSize?: number;
}
