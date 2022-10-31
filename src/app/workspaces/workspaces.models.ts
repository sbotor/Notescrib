import { SharingDetails } from "../core/core-sharing.models";
import { PagingRequest, SortingRequest } from "../core/core.models";

export interface GetWorkspacesRequest extends PagingRequest, SortingRequest {
}

export interface WorkspaceOverview {
  id: string;
  ownerId: string;
  name: string;
  sharingDetails: SharingDetails
}
