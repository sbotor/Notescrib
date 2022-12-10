import { SharingInfo } from "src/app/core/sharing.models";

export interface NoteOverview {
  id: string;
  name: string;
  workspaceId: string;
  folderId: string;
  ownerId: string;
  sharingInfo: SharingInfo;
  created: Date;
  updated?: Date;
  tags: string[];
}
