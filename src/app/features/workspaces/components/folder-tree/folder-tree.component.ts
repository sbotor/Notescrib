import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WorkspaceDetails } from '../../workspaces.models';
import { FolderTreeController } from './folderTreeController';
import {
  FlatFolderNode,
  MenuAction,
  MenuActionType,
  MenuItem,
} from './folder-tree.models';

@Component({
  selector: 'app-folder-tree',
  templateUrl: './folder-tree.component.html',
  styleUrls: ['./folder-tree.component.scss'],
})
export class FolderTreeComponent implements OnInit {
  public readonly TREE_PADDING = 10;

  @Input() workspaceDetails?: WorkspaceDetails;

  @Output() menuAction = new EventEmitter<MenuAction>();

  private readonly menuItems: MenuItem[] = [
    { label: 'Add Folder', type: 'createFolder', shouldRender: (_) => true },
    {
      label: 'Remove',
      type: 'delete',
      shouldRender: (x) => x.item.id !== '',
    },
  ];

  public treeController = new FolderTreeController();

  public ngOnInit() {
    this.treeController.dataSource.data = [
      {
        id: '',
        name: 'CONTENTS',
        children: this.workspaceDetails?.folderTree ?? [],
      },
    ];
  }

  public onMenuAction(node: FlatFolderNode, actionType: MenuActionType) {
    this.menuAction.emit({ node, type: actionType });
  }

  public getMenuItems(node: FlatFolderNode) {
    return this.menuItems.filter((x) => x.shouldRender(node));
  }
}
