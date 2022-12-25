export interface NoteTemplateOverview {
  id: string;
  name: string;
  ownerId: string;
  created: Date;
  updated?: Date;
}

export interface NoteTemplateDetails extends NoteTemplateOverview {
  content: string;
}
