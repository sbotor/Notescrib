import { SharingInfo } from "src/app/core/core.models";

export interface NoteOverview {
  id: string;
  name: string;
  workspaceId: string;
  folderId: string;
  ownerId: string;
  sharingInfo: SharingInfo;
}
