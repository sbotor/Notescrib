export interface SortingRequest {
  direction?: SortingDirection;
  orderBy?: string;
}

export enum SortingDirection {
  Ascending = "Ascending",
  Descending = "Descending",
}

export interface SelectOption {
  label: string;
  value: string;
}

