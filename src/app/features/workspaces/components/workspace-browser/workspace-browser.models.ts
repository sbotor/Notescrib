import { WorkspaceDetails } from "../../workspaces.models";

export interface BrowserItem {
  id: string;
  name: string;
  isNote: boolean;
}

export interface BrowserState {
  workspace: WorkspaceDetails;
  currentItems: BrowserItem[];
}
