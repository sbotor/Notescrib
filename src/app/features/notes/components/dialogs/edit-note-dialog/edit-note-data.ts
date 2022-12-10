import { SharingInfo } from "src/app/core/sharing.models";

export interface EditNoteData {
  name: string;
  sharingInfo: SharingInfo;
  tags: string[];
  id?: string;
}
