export interface CreateWorkspaceRequest {
  name: string;
}

export interface UpdateWorkspaceRequest extends CreateWorkspaceRequest {
}

export interface CreateFolderRequest {
  name: string;
  parent?: string;
}

export interface UpdateFolderRequest extends CreateFolderRequest {
}
