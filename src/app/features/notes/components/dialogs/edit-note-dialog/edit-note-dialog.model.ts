import { SharingInfo } from "src/app/core/sharing.models";

export interface EditNoteDialogData {
  name: string;
  sharingInfo: SharingInfo;
  tags: string[];
  id?: string;
}
