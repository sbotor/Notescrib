import { NoteOverview } from "../notes/notes.models";

export interface FolderInfoBase {
  id: string;
  name: string;
  created: Date;
  updated?: Date;
}

export interface FolderOverview extends FolderInfoBase {
  children: FolderOverview[];
}

export interface FolderDetails extends FolderInfoBase {
  children: FolderInfoBase[];
  notes: NoteOverview[];
}
