export interface SharingInfo {
  visibility: Visibility,
  allowedUserIds: string[]
}

export enum Visibility {
  Private,
  Hidden,
  Public
}
