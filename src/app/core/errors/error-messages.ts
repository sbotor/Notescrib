const generalErrors = {
  Forbidden: 'Invalid permissions to access the resource.',
  NotFound: 'Cannot find the resource.',
  UnexpectedError: 'An unexpected error occured.',
} as const;

const identityErrors = {
  UserNotFound: 'Cannot find the specified user.',
  EmailNotConfirmed: "The user's email has not been confirmed.",
  EmailAlreadyConfirmed: "The user's email has already confirmed.",
  IdentityErrors: generalErrors.UnexpectedError,
  PasswordsDoNotMatch: 'The provided passwords do not match.',
  EmailTaken: 'This email is already taken.',

  NotesError: generalErrors.UnexpectedError,
  EmailsError: 'Error when sending the email.',
} as const;

const notesErrors = {
  WorkspaceNotFound: 'Cannot find the workspace.',
  WorkspaceAlreadyExists: 'A workspace for this user already exists.',
  MaximumFolderCountReached: 'Cannot create more folders.',
  MaximumNoteCountReached: 'Cannot create more notes.',

  CannotNestMoreChildren: 'This folder cannot nest more children.',
  FolderAlreadyExists: 'Folder with this name already exists.',
  FolderNotFound: 'Cannot find the specified folder',

  NoteNotFound: 'Cannot find the specified note.',
  RelatedNoteNotPresent: 'Cannot find the specified related note.',
  NoteAlreadyExists: 'Note with this name already exists.',
  MaximumRelatedNoteCountReached: 'Cannot have more related notes.',
  DuplicateRelatedNoteIds: 'Cannot have duplicate related notes.',
  InvalidRelatedNoteId: 'Invalid related note.',

  NoteTemplateNotFound: 'Cannot find the specified note template.',

  InvalidSortingProperty: 'Cannot sort by this property.',
} as const;



export const errorMessages = {
  ...generalErrors,
  ...identityErrors,
  ...notesErrors,
} as const;
