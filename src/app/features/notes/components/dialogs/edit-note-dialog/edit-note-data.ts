import { SharingInfo } from "src/app/core/core.models";

export interface EditNoteData {
  name: string;
  sharingInfo: SharingInfo;
  labels: string[];
}
