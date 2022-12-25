import { PagingRequest } from "src/app/core/paging.models";

export interface CreateTemplateRequest {
  name: string;
}

export interface SearchTemplatesParams extends PagingRequest {
  textFilter?: string;
}

export interface UpdateTemplateRequest {
  name: string;
}

export interface UpdateTemplateContentRequest {
  content: string;
}
