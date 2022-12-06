export interface SharingInfo {
  visibility: Visibility,
  allowedUserIds: string[]
}

export enum Visibility {
  Private = 'Private',
  Hidden = 'Hidden',
  Public = 'Public'
}
