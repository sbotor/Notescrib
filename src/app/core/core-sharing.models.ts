export interface SharingDetails {
  visibility: Visibility,
  allowedUserIds: string[]
}

export enum Visibility {
  Private,
  Hidden,
  Public
}
