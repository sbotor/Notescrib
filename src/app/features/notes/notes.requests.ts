import { PagingRequest } from "src/app/core/paging.models";
import { SharingInfo } from "src/app/core/sharing.models";

export interface CreateNoteRequest {
  name: string;
  folderId?: string;
  sharingInfo?: SharingInfo;
  tags: string[];
}

export interface UpdateNoteRequest {
  name: string;
  sharingInfo: SharingInfo;
  tags: string[];
  relatedIds: string[];
}

export interface UpdateNoteContentRequest {
  content: string;
}

export interface SearchNotesParams extends PagingRequest {
  textFilter?: string;
  ownOnly: boolean;
}
