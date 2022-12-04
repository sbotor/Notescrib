export interface WorkspaceOverview {
  id: string;
  ownerId: string;
  name: string;
  created: Date;
  updated?: Date
}

export interface WorkspaceDetails extends WorkspaceOverview {
  folderTree: FolderOverview[];
}

export interface FolderOverview {
  id: string;
  name: string;
  children: FolderOverview[];
  created: Date;
  updated?: Date;
}
