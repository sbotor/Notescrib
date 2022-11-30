import { FolderOverview } from '../../workspaces.models';

export class WorkspaceWalker {
  private stack: FolderOverview[] = [];
  private currentFolder?: FolderOverview;

  constructor(private roots: FolderOverview[]) {}

  public getCurrentFolder() {
    return this.currentFolder;
  }

  public down(id: string) {
    if (!this.currentFolder) {
      return this.findChild(this.roots, id);
    }

    const found = this.findChild(this.currentFolder.children, id);
    this.stack.push(this.currentFolder);
    this.currentFolder = found;

    return found;
  }

  public up() {
    if (!this.stack) {
      throw new Error('There is no parent to go up to.');
    }

    return this.stack.pop();
  }

  public reset(roots: FolderOverview[]) {
    this.stack = [];
    this.currentFolder = undefined;
    this.roots = roots;
  }

  private findChild(target: FolderOverview[], id: string) {
    const found = target.find(x => x.id == id);
    if (!found) {
      throw new Error(`Folder with ID ${id} not found is not a child of the current folder.`);
    }

    return found;
  }
}
