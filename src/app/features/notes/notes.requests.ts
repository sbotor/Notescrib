import { SharingInfo } from "src/app/core/core-sharing.models";
import { PagingRequest, SortingRequest } from "src/app/core/core.models";

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
