export interface SortingRequest {
  direction?: SortingDirection;
  orderBy?: string;
}

export enum SortingDirection {
  Ascending = "Ascending",
  Descending = "Descending",
}

export interface SelectOption<T> {
  label: string;
  value: T;
}

