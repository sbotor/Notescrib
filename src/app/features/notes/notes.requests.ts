import { SortingRequest } from "src/app/core/core.models";
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
  folderId?: string;
  sharingInfo: SharingInfo;
  tags: string[];
}

export interface GetNotesRequest extends PagingRequest, SortingRequest {
  workspaceId?: string;
  folderId?: string;
}

export interface CreateNoteSectionRequest {
  parentId?: string;
  name: string;
}

export interface UpdateNoteSectionRequest {
  name: string;
  content: string;
}
