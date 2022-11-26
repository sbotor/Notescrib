export interface WorkspaceOverview {
  id: string;
  ownerId: string;
  name: string;
}

export interface WorkspaceDetails extends WorkspaceOverview {
  folderTree: FolderOverview[];
}

export interface FolderOverview {
  id: string;
  name: string;
  children: FolderOverview[];
}
