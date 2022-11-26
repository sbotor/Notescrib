export interface FolderFlatNode {
  item: FolderFlatNodeItem;
  level: number;
  expandable: boolean;
}

export interface FolderFlatNodeItem {
  id: string;
  name: string;
}
