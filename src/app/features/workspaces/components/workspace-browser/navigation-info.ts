import { FolderOverview } from "../../workspaces.models";

export default interface NavigationInfo {
  getCurrentFolder(): FolderOverview | undefined;
  getCurrentPath(): string | undefined;
  canNavigateUp(): boolean;
  getRoots(): FolderOverview[];
}
