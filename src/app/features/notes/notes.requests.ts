import { SortingRequest } from "src/app/core/core.models";
import { PagingRequest } from "src/app/core/paging.models";
import { SharingInfo } from "src/app/core/sharing.models";

export interface CreateNoteRequest {
  name: string;
  workspaceId: string;
  folderId?: string;
  sharingInfo?: SharingInfo;
  labels: string[];
}

export interface GetNotesRequest extends PagingRequest, SortingRequest {
  workspaceId?: string;
  folderId?: string;
}
