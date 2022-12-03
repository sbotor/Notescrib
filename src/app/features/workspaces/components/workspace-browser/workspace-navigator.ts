import { FolderOverview } from '../../workspaces.models';
import NavigationInfo from './navigation-info';

export default class WorkspaceNavigator implements NavigationInfo {
  private navigationStack: FolderOverview[] = [];

  constructor(private roots: FolderOverview[]) {}

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

  public down(id: string) {
    const currentFolder = this.getCurrentFolder();
    const target = currentFolder
      ? currentFolder.children
      : this.roots;

    const found = this.findChild(target, id);
    this.navigationStack.push(found);

    return found;
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

  public reset(roots: FolderOverview[]) {
    this.navigationStack = [];
    this.roots = roots;
  }

  public getRoots() {
    return this.roots;
  }

  private findChild(target: FolderOverview[], id: string) {
    const found = target.find((x) => x.id == id);
    if (!found) {
      throw new Error(
        `Folder with ID ${id} not found is not a child of the current folder.`
      );
    }

    return found;
  }
}
