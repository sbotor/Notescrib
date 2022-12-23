import { SharingInfo } from "src/app/core/sharing.models";

export interface NoteOverview {
  id: string;
  name: string;
  folderId: string;
  ownerId: string;
  sharingInfo: SharingInfo;
  created: Date;
  updated?: Date;
  tags: string[];
  isReadonly: boolean;
}

export interface NoteDetails extends NoteOverview {
  content: string;
  isReadonly: boolean;
  related: NoteOverview[];
}
