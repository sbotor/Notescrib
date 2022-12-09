import { FolderNavInfo } from "./workspace-browser.models";

export default interface NavigationInfo {
  getCurrentFolder(): FolderNavInfo | undefined;
  getCurrentPath(): string | undefined;
  canNavigateUp(): boolean;
}
