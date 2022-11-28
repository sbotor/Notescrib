import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { FolderOverview } from '../../workspaces.models';
import { FlatFolderNode } from './folder-tree.models';

export class FolderTreeController {

  public readonly treeControl: FlatTreeControl<FlatFolderNode>;
  public readonly treeFlattener: MatTreeFlattener<
    FolderOverview,
    FlatFolderNode
  >;
  public readonly dataSource: MatTreeFlatDataSource<
    FolderOverview,
    FlatFolderNode
  >;

  constructor() {
    this.treeControl = new FlatTreeControl<FlatFolderNode>(
      (x) => x.level,
      (x) => x.expandable
    );

    this.treeFlattener = new MatTreeFlattener<FolderOverview, FlatFolderNode>(
      this.transformNode,
      (x) => x.level,
      (x) => x.expandable,
      (x) => x.children
    );

    this.dataSource = new MatTreeFlatDataSource<FolderOverview, FlatFolderNode>(
      this.treeControl,
      this.treeFlattener
    );
  }

  public hasChild = (_: number, node: FlatFolderNode) => node.expandable;

  private transformNode(folder: FolderOverview, level: number): FlatFolderNode {
    return {
      item: {
        id: folder.id,
        name: folder.name,
      },
      level: level,
      expandable: folder.children.length > 0,
    };
  }
}
