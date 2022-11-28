export interface FlatFolderNode {
  item: FolderFlatNodeItem;
  level: number;
  expandable: boolean;
}

export interface FolderFlatNodeItem {
  id: string;
  name: string;
}

export interface MenuAction {
  type: MenuActionType;
  node: FlatFolderNode;
}

export type MenuActionType = 'createFolder' | 'delete';

export interface MenuItem {
  label: string;
  type: MenuActionType;
  shouldRender: (node: FlatFolderNode) => boolean;
}
