import { PagingRequest, SortingRequest } from "src/app/core/core.models";

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

export interface UpdateFolderRequest extends CreateFolderRequest {
}
