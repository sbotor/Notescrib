import NavigationInfo from './navigation-info';
import { FolderNavInfo } from './workspace-browser.models';

export default class WorkspaceNavigator implements NavigationInfo {
  private navigationStack: FolderNavInfo[] = [];

  constructor(private roots: FolderNavInfo[]) {}

  public getCurrentFolder() {
    return this.navigationStack.length < 1
      ? undefined
      : this.navigationStack[this.navigationStack.length - 1];
  }

  public getCurrentPath() {
    return !this.canNavigateUp()
      ? undefined
      : this.navigationStack
          .map((x) => x.name)
          .reduce((acc, curr) => acc.concat(`/${curr}`));
  }

  public down(folder: FolderNavInfo) {
    this.navigationStack.push(folder);
  }

  public canNavigateUp() {
    return this.navigationStack.length > 0;
  }

  public up() {
    if (!this.canNavigateUp()) {
      throw new Error('There is no parent to go up to.');
    }

    this.navigationStack.pop();
    return this.getCurrentFolder();
  }

  public reset(roots: FolderNavInfo[]) {
    this.navigationStack = [];
    this.roots = roots;
  }
}
