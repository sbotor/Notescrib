import { FolderOverview } from '../../workspaces.models';

export class WorkspaceNavigator {
  private navigationStack: FolderOverview[] = [];
  private currentFolder?: FolderOverview;

  constructor(private roots: FolderOverview[]) {}

  public getCurrentFolder() {
    return this.currentFolder;
  }

  public getCurrentPath() {
    return !this.canNavigateUp()
      ? undefined
      : this.navigationStack
          .map((x) => x.name)
          .reduce((acc, curr) => acc.concat(`/${curr}`));
  }

  public down(id: string) {
    if (!this.currentFolder) {
      return this.findChild(this.roots, id);
    }

    const found = this.findChild(this.currentFolder.children, id);
    this.navigationStack.push(this.currentFolder);
    this.currentFolder = found;

    return found;
  }

  public canNavigateUp() {
    return this.navigationStack.length > 0;
  }

  public up() {
    if (!this.canNavigateUp()) {
      throw new Error('There is no parent to go up to.');
    }

    return this.navigationStack.pop()!;
  }

  public peekParent() {
    if (!this.canNavigateUp()) {
      return undefined;
    }

    return this.navigationStack[this.navigationStack.length - 1];
  }

  public reset(roots: FolderOverview[]) {
    this.navigationStack = [];
    this.currentFolder = undefined;
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
