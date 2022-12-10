import { SortingRequest } from "src/app/core/core.models";
import { PagingRequest } from "src/app/core/paging.models";

export interface GetWorkspacesRequest extends PagingRequest, SortingRequest {
}

export interface CreateWorkspaceRequest {
  name: string;
}

export interface UpdateWorkspaceRequest extends CreateWorkspaceRequest {
}

export interface CreateFolderRequest {
  name: string;
  parentId?: string;
}

export interface UpdateFolderRequest{
  name: string;
}
