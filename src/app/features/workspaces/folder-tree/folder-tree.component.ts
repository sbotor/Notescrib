import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { FolderFlatNode } from './folder-tree.models';
import { FolderOverview, WorkspaceDetails } from '../workspaces.models';

@Component({
  selector: 'app-folder-tree',
  templateUrl: './folder-tree.component.html',
  styleUrls: ['./folder-tree.component.scss'],
})
export class FolderTreeComponent implements OnInit {
  @Input() workspaceDetails?: WorkspaceDetails;

  private previousId = '';
  @Output() selectionChanged = new EventEmitter<string>();

  public readonly treeControl: FlatTreeControl<FolderFlatNode>;
  public readonly treeFlattener: MatTreeFlattener<
    FolderOverview,
    FolderFlatNode
  >;
  public readonly dataSource: MatTreeFlatDataSource<
    FolderOverview,
    FolderFlatNode
  >;

  constructor() {
    this.treeControl = new FlatTreeControl<FolderFlatNode>(
      (x) => x.level,
      (x) => x.expandable
    );

    this.treeFlattener = new MatTreeFlattener<FolderOverview, FolderFlatNode>(
      this.transformNode,
      (x) => x.level,
      (x) => x.expandable,
      (x) => x.children
    );

    this.dataSource = new MatTreeFlatDataSource<FolderOverview, FolderFlatNode>(
      this.treeControl,
      this.treeFlattener
    );
  }

  public ngOnInit() {
    this.dataSource.data = [
      {
        id: '',
        name: this.workspaceDetails?.name ?? 'error',
        children: this.workspaceDetails?.folderTree ?? [],
      },
    ];
  }

  public hasChild = (_: number, node: FolderFlatNode) => node.expandable;

  public selectNode(id: string) {
    if (id === this.previousId) {
      return;
    }

    this.previousId = id;
    this.selectionChanged.emit(id);
  }

  private transformNode(folder: FolderOverview, level: number): FolderFlatNode {
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
