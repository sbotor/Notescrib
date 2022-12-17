import { NoteOverview } from "../notes/notes.models";

export interface FolderOverview {
  id: string;
  name: string;
  created: Date;
  updated?: Date;
}

export interface FolderDetails extends FolderOverview {
  children: FolderOverview[];
  notes: NoteOverview[];
}
