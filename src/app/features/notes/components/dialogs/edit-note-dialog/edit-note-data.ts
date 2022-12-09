import { SharingInfo } from "src/app/core/sharing.models";

export interface EditNoteData {
  name: string;
  sharingInfo: SharingInfo;
  labels: string[];
  id?: string;
}
